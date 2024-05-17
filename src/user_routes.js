/* Tässä tiedostossa määritellään Express-reitit käyttäjän tietojen käsittelyyn. Tämä tiedosto on
vastuussa käyttäjän tietojen käsittelystä ja reittien määrittämisestä.*/

// Tuodaan tarvittavat moduulit ja funktiot
import { Router } from "express";
import {db} from "../database/sqlite.js"
import { JWT_SECRET } from "./config.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import { adminOnly, authenticate } from "./middlewares/auth.js";

export const router = Router();

// Määritellään käyttäjän salasanan suolaus kierrosten määrä
const saltRounds = 10

// GET-reitti käyttäjän tietojen hakuun 
router.get('/user/account', authenticate, (req, res)=>{

    res.json(req.userData)

})

// GET-reitti kaikkien käyttäjien tietojen hakuun
router.get('/user', authenticate, adminOnly, (req, res) => {

    db.all('SELECT id, username, age, role FROM user', [], (err, rows) => {

        if (err) {
            return res.status(404).send('Users not found')
        }

        res.send(JSON.stringify(rows))
    })

})

// GET-reitti yksittäisen käyttäjän tietojen hakuun id:n perusteella
router.get('/user/:id', (req, res) => {
    const id = req.params.id

    db.get('SELECT id, username, age, role FROM user WHERE id = ?', [id], (err, row) => {

        if (err) {
            return res.status(404).send('User not found')
        }

        res.send(JSON.stringify(row))
    })
   
})

// POST-reitti uuden käyttäjän luomiseen
router.post('/user', async (req, res) => {
    const { username, password, age, role } = req.body

    if (!username || !age || !password || !role) {
        return res.status(400).send("Tarkista tiedot")
    }

    const hashedPassword = await hash(password, saltRounds)

 

    const stmt = db.prepare("INSERT INTO user VALUES (NULL, ?, ?, ?, NULL, ?)")


    stmt.run(username, hashedPassword, age, role, (err)=>{

        if(err){
            // Ei tehdä tuotantoympäristössä!
           /*  return res.status(400).json({
                error: err
            }) */

            return res.status(400).json({
                error: "Kokeile toista käyttäjänimeä"
            }) 
        }

        
        res.status(201).send('Käyttäjä luotu onnistuneesti')
        
    })
    
  

})


// PUT-reitti käyttäjän tietojen päivittämiseen
router.put('/user', (req, res) => {


    const { username, age, id, role } = req.body

    if (!username || !age || !id || !role) {
        return res.status(400).send("Tarkista tiedot")
    }

    db.serialize(() => {

        const stmt = db.prepare("UPDATE user SET username = ?, age = ?, role = ? WHERE id = ?")

        stmt.run(username, age, role, id)

        stmt.finalize()

        res.send('Käyttäjä päivitetty onnistuneesti')
    })
})

// PATCH-reitti käyttäjän iän päivittämiseen
router.patch('/user', (req, res) => {
    res.send('Käyttäjän ikä päivitetty onnistuneesti')
})

// DELETE-reitti käyttäjän poistamiseen
router.delete('/user/:id', (req, res) => {
    const id = req.params.id

    db.run("DELETE FROM user WHERE id = ?", [id], (err) => {

        if (err) {
            return res.status(404).send()
        }

        res.send("Käyttäjätili poistettu onnistuneesti")

    })

})


// POST-reitti käyttäjän kirjautumiseen
router.post('/user/login', (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send()
    }
    
    // Haetaan käyttäjä tietokannasta käyttäjänimen perusteella
    db.get('SELECT id, password, role FROM user WHERE username = ?', [username], async (err, row) => {

        if (err || !row) {
            return res.status(400).send()
        }

         // Tarkistetaan, että annettu salasana vastaa tietokannassa olevaa salasanaa
        const isAuthenticated = await compare(password, row.password)
         // Jos salasana on oikein, luodaan JWT-token ja palautetaan se käyttäjälle
        if (isAuthenticated) {

            const jti = crypto.randomUUID()



            const token = jwt.sign({
                role: row
            }, JWT_SECRET, {
                expiresIn: '1h',
                jwtid: jti
            })

            db.serialize(() => {

                const stmt = db.prepare("UPDATE user SET jti = ? WHERE id = ?")

                stmt.run(jti, row.id)

                stmt.finalize()

                res.cookie('accessToken', token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: true
                })
                return res.send("Kirjautuminen onnistui")
            })
        } else {
            // Jos salasana on väärin, palautetaan virheviesti
            return res.status(400).send()
        }
    })

})

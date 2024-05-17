import jwt from 'jsonwebtoken'
import { db } from '../../database/sqlite.js'
import { JWT_SECRET } from '../config.js'


export function authenticate(req, res, next){
    try {
        // Haetaan käyttäjän token
        const { accessToken } = req.cookies

        // Jos tokenia ei ole, palautetaan status 401
        if (!accessToken) {
            return res.status(401).send()
        }
        // Varmennetaan tokenin oikeellisuus
        const { jti } = jwt.verify(accessToken, JWT_SECRET)

        // Haetaan käyttäjän tiedot tietokannasta
        db.get('SELECT id, username, age, role FROM user WHERE jti = ?', [jti], (err, row) => {

            // Jos tulee virhe, palautetaan virheviesti
            if (err) {
                return res.status(404).send('Account data not found')
            }
            // Lisätään käyttäjän tiedot pyyntöön ja jatketaan seuraavaan middlewareen
            req.userData = row            
            next()
        
        })

    } catch (err) {
        // Jos tulee virhe, palautetaan virheviesti
        res.status(401).send(err)
    }

}

// Tämä funktio tarkistaa, että käyttäjä on admin
export function adminOnly(req, res, next){
    
    // Jos käyttäjä on admin, jatketaan seuraavaan middlewareen
    if(req.userData && req.userData.role === 'admin'){
        return next()
    } else {
        res.status(401).send()
    }

}
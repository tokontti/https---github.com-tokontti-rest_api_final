// Luodaan muistilapun reitit
import { Router } from "express";
import { authenticate } from "./middlewares/auth.js";
import { db } from '../database/sqlite.js'

export const noteRouter = Router()

// Haetaan kaikki muistilaput autentikoinnin jälkeen
noteRouter.get("/notes", authenticate, (req, res) => {

    db.all("SELECT * FROM note", [], (err, rows) => {

        if (err) {
            return res.status(500).send()
        }

        res.json(rows)

    })
})

// Luodaan muistilappu autentikoinnin jälkeen
noteRouter.post("/notes", authenticate, (req, res) => {

    const { content } = req.body

    const stmt = db.prepare("INSERT INTO note VALUES (NULL, ?)")

    stmt.run(content, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Muistilapun luomisessa tapahtui virhe"
            })
        }

        res.status(201).send('Muistilappu luotu onnistuneesti')

    })

})

// Haetaan muistilappu ID:n perusteella
noteRouter.get("/notes/:id", authenticate, (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM note WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).send();
        }

        if (row) {
            res.json(row);
        } else {
            res.status(404).send();
        }
    });
});

// Päivitetään muistilappu ID:n perusteella autentikoinnin jälkeen
noteRouter.put("/notes/:id", authenticate, (req, res) => {
    const { content } = req.body;
    const { id } = req.params;

    const stmt = db.prepare("UPDATE note SET content = ? WHERE id = ?");

    stmt.run(content, id, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Muistilapun päivittämisessä tapahtui virhe"
            });
        }

        res.send('Muistilappu päivitetty onnistuneesti');
    });
});

// Poistetaan muistilappu ID:n perusteella autentikoinnin jälkeen
noteRouter.delete("/notes/:id", authenticate, (req, res) => {
    const { id } = req.params;

    const stmt = db.prepare("DELETE FROM note WHERE id = ?");

    stmt.run(id, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Muistilapun poistamisessa tapahtui virhe"
            });
        }

        res.send('Muistilappu poistettu onnistuneesti');
    });
});
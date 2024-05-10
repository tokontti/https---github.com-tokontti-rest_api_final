// Tämä tiedosto on vastuussa datan käsittelystä ja tietokannan luomisesta. 
// Tietokantaan tallennetaan käyttäjien tiedot. Tietokantaan tallennetaan myös muistiinpanot.

import sqlite3 from "sqlite3";

export const db = new sqlite3.Database('database/db.sqlite')

db.exec("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, age INTEGER, jti TEXT, role TEXT NOT NULL) STRICT")
db.exec("CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL) STRICT")


# NodeJS REST API 

## Tarvittavat ohjelmistot

- git
- NodeJS

## Käyttöönotto

1. Kloonaa repositorio koneellesi:
   - **git clone -- git clone https://github.com/tokontti/https---github.com-tokontti-rest_api_final.git rest_api_final**
   - **cd rest_api_final**
2. Varmista että oikea git-branch on aktiivisena. Kloonaamisen jälkeen ilman tuota "--branch actual_lecture_9" oletuksena on main-branch aktiisena, se näkyy esim. VS Coden vasemmassa alalaidassa, ja sitä klikkaamalla avautuu valikko mistä paikallisen repositorion aktiivisen branchin voi vaihtaa. Tässä tapauksessa branchin tulisi olla "actual_lecture_9". Vaihtoehtoisesti branchin voi vaihtaa komentoriviltä komennolla "git checkout actual_lecture_9".
3. Suorita komento **npm install** asentaaksesi package.json tiedostossa määritellyt npm-paketit joita projektissa käytetään (dependencies)
4. Luo .env -niminen tiedosto on kansion juureen ja lisää sinne ympäristömuuttuja **JWT_SECRET** avainarvoparina seuraavasti: "JWT_SECRET=tähän_satunnainen_merkkijono_salaisuudeksi_millä_jwt_token_allerkirjoitetaan_ja_luetaan". Muista tallentaa muutokset.
5. Käynnistä kehityspalvelin komennolla **npm run dev**

6. Pääset alkuun voit luomalla sekä admin, user tasoiset käyttäjät insomniumin avulla

7. Tämän jälkeen voit avata web sivun localhost:3000 ositteesta. 
Onnistuneen kirjautumisen jäleeen pääset suoraan muostion haku / luontisivuille


8.	Kun haluat hakea kaikki muistiot paina kaikki muistiot nappia.
Hakutulokset tulevat kaikkein alimpaan teksti ikkunaan.
Ikkunan koko skaalautuu hakutapahtuman suuruuden mukaan.
Hakutulokset tulevat kaikkein alimpaan teksti ikkunaan.

9.	Luo uusi muistio saat luotua uuden muistion 
10.	Pävitä muistio id:n perusteella voit hakea muistion id:n hae kaikki muistiot avulla. ( jos haluat päivittää tekstin tämä on maksullinen palvelu ei kuulu freewaren piiriin :-)
11.	Voit  hakea muitiota id.n perusteella
12.	Voit myös poistaa Id:n perusteella.

13 Polkurakenne tiedostossa
Folder PATH listing for volume Windows

C:\Projektit\rajapinnat\restapi\rest_api_final
|   .env
|   .gitignore
|   directory_structure.txt
|   openapi.json
|   package-lock.json
|   package.json
|   README.md
|   server.js
|   
+---database
|       db.sqlite
|       sqlite.js
|      
|           
+---public
|       add_user.html
|       app.js
|       doge.png
|       index.html
|       notes.html
|       notes.js
|       
\---src
    |   config.js
    |   note_routes.js
    |   user_routes.js
    |   
    \---middlewares
            auth.js


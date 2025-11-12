// De pakker vi har installeret for at få Javascript til at snakke sammen med SQL og insomnia.

const express = require("express");
//npm install mysql2 --save (skrevet i terminalen)
const mysql = require("mysql2");
//npm install cors --save (skrevet i terminalen)
const cors = require("cors");
const {query} = require("express");
const app = express();

// Den lokale host vi brugte, for at querie direkte i webstorm, og få svaret ud i insomnia
const port = 8080;

app.use(cors());
app.use(express.json())

// For at kunne connecte til GitHub skrev vi vores koder hver især i configurations. På den måde kunne vi connecte til MySQL og bruge queriesne
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});
// Fejlmeddelelser, sådan at vi bedre kunne vide, hvilken specifik fejl der var. Kilde: chatGPT.com
connection.connect((err) => {
    if (err) {
        console.error("Fejl ved forbindelse til databasen:", err.message);
        process.exit(1); // Stop serveren hvis der er fejl
    } else {
        console.log("Forbundet til MySQL databasen!");

        app.listen(port, () => {
            console.log(`Server kører på port ${port}`);
        });
    }
});

// QUERIES

app.get("/soldrock", (req, res) => {
    connection.query(`SELECT /*Vælger de kolonner, vi vil vise i resultatet.*/
                          i.BillingCountry AS Country, /*henter landet fra fakturaen, altså hvor kunden bor. Giver kolonnen et mere læsbart navn*/
                          SUM(il.Quantity) AS UnitsSold /*lægger alle solgte enheder sammen for hvert land. Navngiver kolonnen, så den viser antallet af solgte tracks*/
                      FROM InvoiceLine il /*starter i tabellen InvoiceLine, hvor alle købslinjer ligger.*/
                               JOIN Invoice i   ON il.InvoiceId = i.InvoiceId /*forbinder hver købslinje med sin faktura for at kunne se, hvilket land salget kom fra.*/
                               JOIN Track t     ON il.TrackId   = t.TrackId /*forbinder salget med den sang, der blev købt.*/
                               JOIN Genre g     ON t.GenreId    = g.GenreId /*forbinder hver sang med dens genre.*/
                      WHERE g.Name = 'Rock' /*filtrerer resultaterne, så kun køb af rockmusik medtages.*/
                      GROUP BY i.BillingCountry /*samler alle resultater pr. land, så vi får én række pr. land.*/
                      ORDER BY UnitsSold DESC /*sorterer landene efter flest solgte rocknumre først.*/
                          LIMIT 3;`, /*viser kun de tre lande med flest solgte rocknumre.*/
        (err, results) => {
            res.send(results);
        });
});


app.get("/revenue", (req, res) => {
    connection.query(`SELECT /*vælger de kolonner, vi vil vise.*/
                        BillingCountry AS country, /*henter kundens land fra fakturaen. Giver kolonnen et kort navn.*/
                             COUNT(*) AS Invoices,/*Tæller hvor mange fakturaer der er pr. land. Navngiver kolonnen for antal fakturaer.*/
                             COUNT(DISTINCT CustomerId) AS Customers, /*tæller unikke kunder i hvert land. Giver kolonnen et navn.*/
                             ROUND(SUM(Total), 2) AS Revenue, /*lægger alle fakturabeløb sammen for at finde den samlede omsætning. Afrunder omsætningen til to decimaler. Navngiver kolonnen med omsætning.*/
                             ROUND(AVG(Total), 2) AS AvgOrderValue /*beregner gennemsnitsbeløbet pr. faktura. Afrunder gennemsnittet til to decimaler. Navngiver kolonnen med gennemsnittet.*/
                      FROM Invoice /*angiver, at dataene hentes fra fakturatabellen.*/
                      GROUP BY BillingCountry /*grupperer data pr. land.*/
                      ORDER BY Revenue DESC limit 3;`, /*sorterer resultaterne, så de lande med højest omsætning vises først.*/
        (err, results) => {
            res.send(results);
        });
});

app.get("/genre", (req, res) => {
    connection.query(`SELECT /*vælger de kolonner, vi vil vise i resultatet.*/
                        g.Name AS Genre, /*henter navnet på genren fra tabellen Genre. Giver kolonnen et læsbart navn i resultatet.*/
                        SUM(il.UnitPrice * il.Quantity) AS TotalSales /*ganger prisen pr. track med antallet solgt og lægger det hele sammen for at finde den samlede omsætning pr. genre. Navngiver kolonnen, så den viser totalsalget for hver genre.*/
                      FROM InvoiceLine il /*starter i tabellen InvoiceLine, som indeholder oplysninger om hvert solgt track.*/
                        JOIN Track t ON il.TrackId = t.TrackId /*forbinder hver salgslinje med det specifikke track, der blev solgt.*/
                        JOIN Genre g ON t.GenreId = g.GenreId /*forbinder hvert track med den genre, det tilhører.*/
                      GROUP BY g.GenreId /*samler alle resultater pr. genre, så vi får én række pr. genre i stedet for én pr. track.*/
                      ORDER BY TotalSales DESC limit 3;`, /*sorterer genrerne efter den samlede omsætning i faldende rækkefølge, så de bedst sælgende genrer vises øverst.*/
        (err, results) => {
            res.send(results);
        });
});





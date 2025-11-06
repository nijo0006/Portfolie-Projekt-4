const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());

// Opret MySQL-forbindelse med fejlhåndtering
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("Fejl ved forbindelse til databasen:", err.message);
        process.exit(1); // Stop serveren hvis der er fejl
    } else {
        console.log("Forbundet til MySQL databasen!");

        // Start serveren efter database er oprettet
        app.listen(port, () => {
            console.log(`Server kører på port ${port}`);
        });
    }
});

// Simpel route
app.get("/hello", (req, res) => {
    console.log("Hey alle sammen");
    res.send("Hello Everyone");
});


app.get("/basicquery",(req,res)=>{
    connection.query(`SELECT i.BillingCountry, g.Name AS Genre, SUM(il.Quantity) AS QuantitySold
    FROM InvoiceLine il
    JOIN Invoice i ON il.InvoiceId = i.InvoiceId
    JOIN Track t ON il.TrackId = t.TrackId
    JOIN Genre g ON t.GenreId = g.GenreId
    GROUP BY i.BillingCountry, g.Name
    ORDER BY i.BillingCountry, QuantitySold DESC;`,
    (err,results)=>{
        res.send(results);
    });
});





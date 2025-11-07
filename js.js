const express = require("express");
//npm install mysql2 --save
const mysql = require("mysql2");
//npm install cors --save
const cors = require("cors");
const {query} = require("express");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())

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


app.get("/revenue",(req,res)=>{
    connection.query(`SELECT
    BillingCountry AS country,
    COUNT(*) AS Invoices,
    COUNT(DISTINCT CustomerId) AS Customers,
    ROUND(SUM(Total), 2) AS Revenue,
    ROUND(AVG(Total), 2) AS AvgOrderValue
    FROM Invoice
    GROUP BY BillingCountry
    ORDER BY Revenue DESC;`,
        (err,results)=>{
            res.send(results);
        });
});

app.get("/genre",(req,res)=>{
    connection.query(`SELECT g.Name AS Genre, SUM(il.UnitPrice * il.Quantity) AS TotalSales
                      FROM InvoiceLine il
                               JOIN Track t ON il.TrackId = t.TrackId
                               JOIN Genre g ON t.GenreId = g.GenreId
                      GROUP BY g.GenreId
                      ORDER BY TotalSales DESC;`,
        (err,results)=>{
            res.send(results);
        });
});





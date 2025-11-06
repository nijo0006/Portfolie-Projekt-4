const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 8080;

// Opret MySQL-forbindelse med fejlhåndtering
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: "Chinook"
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

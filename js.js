const ctx = document.querySelector('#chart').getContext('2d');
const chart = new Chart(ctx, {})

const connection = mysql.createConnection({
    host: "localhost",
    user: "DBUSER",
    password:"DBPASSWORD",
    database: "Chinook"
});
//This is boilerplate code to write a simple web-server
const http = require("http");

http.createServer((req,res)=>{
    res.write("Hello Everyone");
    res.end();
}).listen(8000);

app.get("/hello", ()=> {
    Console.log("Hey alle sammen");
});
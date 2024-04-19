const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.static(__dirname));


//skapar anslutning till databas
const connection = mysql.createConnection({
    host: "localhost",
    user: "moment2_db",
    password: "TreesandWood",
    database: "moment2_db"
});

connection.connect((err) => {
    if(err) {
        console.error("Connection failed: " + err);
        return;
    }

    console.log("connected to mysql");
})

//Routes

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
    res.json({message: "De här är api:n :)"})
})

app.get("/api/workers", (req, res) => {
    res.json({message: "Hämtar arbetare :)"})
})

app.post("/api/workers", (req, res) => {
    res.json({message: "Lägg till arbetare :)"})
})

app.put("/api/workers/:id", (req, res) => {
    res.json({message: "Arbetare uppdaterad " + req.params.id})
})

app.delete("/api/workers/:id", (req, res) => {
    res.json({message: "Arbetare raderad " + req.params.id})
})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
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
    user: "root",
    password: "",
    database: "cv_database"
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
    
    connection.query("SELECT * FROM workexperience", (err, results) => {
        if(err) {
            res.status(500).json({error: "Something went wrong " + err});
            return;
        }

        console.log(results);

        if(results === 0) {
            res.status(404).json({message: "Nothing found"});
        }

        else {
            res.json(results)
        }
    })
})

app.post("/api/workers", (req, res) => {
    res.json({message: "Lägg till arbete :)"})
})

app.put("/api/workers/:id", (req, res) => {
    res.json({message: "Arbete uppdaterad " + req.params.id})
})

app.delete("/api/workers/:id", (req, res) => {
    res.json({message: "Arbete raderad " + req.params.id})
})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
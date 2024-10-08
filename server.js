const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = 3000;
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

//skapar anslutning till databas
const connection = mysql.createConnection({
    host: "localhost",
    user: "cv_database",
    password: "Banja2020",
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

    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    connection.query("INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)", [companyname, jobtitle, location, startdate, enddate, description], 
       
       (err, result) => {
        if(err) {
            console.error("Could not add work: " + err);
            res.status(500).json({error: "failed to add job"});
        } else {
            console.log("Job added");
        }
       });
});


app.put('/api/workers/:id', (req, res) => {
    const jobID = req.params.jobID;
    const { jobtitle, location, startdate, enddate, description } = req.body;
  
    // SQL-förfrågan för att uppdatera jobbet baserat på företagsnamn
    const sql = `UPDATE jobs SET jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE jobId=?`;
  
    // Utför SQL-förfrågan
    connection.query(sql, [jobtitle, location, startdate, enddate, description, jobID], (error, results) => {
      if (error) {
        console.error('Kunde inte uppdatera jobbet: ' + error.message);
        return res.status(500).json({ message: 'Kunde inte uppdatera jobbet' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Inget jobb hittades för det angivna företagsnamnet' });
      }
  
      return res.status(200).json({ message: 'Jobbet har uppdaterats' });
    });
  });
  

app.delete("/api/workers/:id", (req, res) => {
    const jobID = req.params.id;

    connection.query("DELETE FROM workexperience WHERE id = ?", [jobID], 
     
     (err, result) => {
        if (err) {
            console.error("Can not delete job: " + err);
            res.status(500).json({error: "failed to delete job"});
        } else {
            res.json({message: "Job deleted"});
        }
     });
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
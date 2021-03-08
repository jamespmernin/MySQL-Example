let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

let connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "join_us"
});

const PORT = 3000;

app.get("/", function(req, res){
    // Find counter of users in db
    var q = "SELECT COUNT(*) AS count FROM USERS";
    connection.query(q, function(err, results){
        if (err) throw err;
        let count = results[0].count;
        res.render("home", {data: count});
    });
});

app.post("/register", function(req, res){
    let person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result){
        if (err) throw err;
        res.redirect("/");
    });
    console.log("POST REQUEST SENT TO /REGISTER email is" + req.body.email);
});

app.listen(PORT, function () {
    console.log("Server running on " + PORT + "!");
});
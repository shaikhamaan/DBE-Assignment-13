const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'amaan60320',
    database: 'login'
})

//connect to mysql
db.connect(err => {
    if(err){
        throw err;
    }
    console.log('Connected to MySQL!!!');
})

const app = express();
app.use(express.json()); 
app.use(cors());

// create database
app.post('/signup', (req, res) => {

    const fName = req.body.fname;
    const lName = req.body.lname;
    const mail = req.body.email;
    const pwd = req.body.password;

    db.query("INSERT INTO `login`.`data_entry` (`f_name`, `l_name`, `email`, `password`) VALUES (?,?,?,?);", [fName, lName, mail, pwd], (err, res) => {
        console.log(err);
    });
})

app.post('/login', (req, res) => {
    const mail = req.body.email;
    const pwd = req.body.password;

    db.query(
        "SELECT * FROM `login`.`data_entry` WHERE email=? and password=?",
        [mail, pwd], 
        (err, result) => {
            if(err){
                res.send({err:err});
            }

            if(result.length > 0){
                res.send(result);
            } else {
                res.send({message: 'Wrong email/password combination!!!'});
            }
        }
        )
    })

app.listen('3001', () => {
    console.log('Server started at port 3001');
});
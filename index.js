const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
  //   database: "nodesql"
});

db.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/createDB", (req, res) => {
  let dbname = "CREATE DATABASE nodesql";
  db.query(dbname, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.send("Database Created");
    }
  });
});

app.listen(3000, () => {
  console.log("Server Started on 3000");
});

const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodesql"
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

app.get("/createPostTable", (req, res) => {
  let query =
    "CREATE TABLE post(id int AUTO_INCREMENT,title VARCHAR(250),body VARCHAR(250),PRIMARY KEY(id))";

  //query  to  create table

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table Created");
  });
});

//query to add data into the table

app.get("/addPost", (req, res) => {
  let post = {
    title: "Post 1",
    body: "Description of the post 1"
  };

  let query = "INSERT INTO post SET ?";

  db.query(query, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post is Created into the Table");
  });
});

//Select Query

app.get("/getPosts", (req, res) => {
  let query = "SELECT * FROM post";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

// select by id
app.get("/getPost/:id", (req, res) => {
  let query = `SELECT * FROM post WHERE id= ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//update post by id
app.get("/updatePost/:id", (req, res) => {
  let title = "update new title";
  let query = `UPDATE post SET title='${title}' WHERE id=${req.params.id}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//Delete post by id
app.get("/deletePost/:id", (req, res) => {
  let query = `DELETE FROM post WHERE id=${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server Started on 3000");
});

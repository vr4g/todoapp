const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { Pool } = require("pg");
require("dotenv").config();

let pool = new Pool();

const PORT = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});

app.get("/tasks", (req, res) => {
  try {
    pool.connect(async (err, client, release) => {
      let resp = await client.query(
        `SELECT * FROM todo LEFT JOIN categories ON todo.category_id = categories.category_id ORDER BY id`
      );
      release();
      res.json(resp.rows);
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/postTask", bodyParser.json(), (req, res) => {
  console.log(req.body.category_id);
  try {
    pool.connect(async (error, client, release) => {
      let res = await client.query(
        `INSERT INTO todo (title, category_id) VALUES ('${req.body.title}', '${req.body.category_id}')`
      );
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteTask", bodyParser.json(), (req, res) => {
  try {
    pool.connect(async (error, client, release) => {
      let resp = await client.query(
        `DELETE FROM todo WHERE (id) = '${req.body.id}'`
      );
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateTask", bodyParser.json(), (req, res) => {
  try {
    pool.connect(async (error, client, release) => {
      let resp = await client.query(
        `UPDATE todo Set title = '${req.body.title}' WHERE id = '${req.body.id}'`
      );
    });
  } catch (error) {
    console.log(error);
  }
});

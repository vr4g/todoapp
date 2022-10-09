const pool = require("../dbConfig/dbPool");

getTasks = (req, res) => {
  try {
    pool.connect(async (err, client, release) => {
      let resp = await client.query(
        `SELECT * FROM todo LEFT JOIN categories ON todo.category_id = categories.category_id ORDER BY id`
      );
      res.json(resp.rows);
      release();
    });
  } catch (err) {}
};

filterTasks = (req, res) => {
  const queryString = `SELECT * FROM todo LEFT JOIN categories ON todo.category_id = categories.category_id WHERE todo.category_id = $1`;
  try {
    if (isNaN(req.query.category_id)) {
      return res.json({ error: "Id must be number" });
    } else {
      pool.connect(async (err, client, release) => {
        let resp = await client.query(queryString, [req.query.category_id]);
        res.json(resp.rows);
        release();
      });
    }
  } catch (err) {
    console.log(err);
  }
};

deleteTask = (req, res) => {
  try {
    pool.connect(async (err, client, release) => {
      let resp = await client.query(`DELETE FROM todo WHERE (id) = $1`, [
        req.params.id,
      ]);
      res.json(resp.rows);
      release();
    });
  } catch (err) {
    console.log(err);
  }
};
addTask = (req, res) => {
  try {
    pool.connect(async (err, client, release) => {
      let resp = await client.query(
        `INSERT INTO todo (title, category_id) VALUES ($1, $2)`,
        [req.body.title, req.body.category_id]
      );
      res.json(resp.rows);
      release();
    });
  } catch (err) {
    console.log(err);
  }
};

updateTask = (req, res) => {
  try {
    pool.connect(async (err, client, release) => {
      let resp = await client.query(
        `UPDATE todo Set title = $1 WHERE id = $2`,
        [req.body.title, req.body.id]
      );
      res.json(resp.rows);
      release();
    });
  } catch (err) {
    console.log(err);
  }
};

checkTask = (req, res) => {
  try {
    pool.connect(async (err, client, release) => {
      let resp = await client.query(
        `UPDATE todo Set checked = $1 WHERE id = $2`,
        [req.body.checked, req.body.id]
      );
      res.json(resp.rows);
      release();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  filterTasks,
  checkTask,
};

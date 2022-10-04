const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  filterTasks,
} = require("../models/task");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/task", getTasks);
router.post("/task", bodyParser.json(), addTask);
router.delete("/task/:id", bodyParser.json(), deleteTask);
router.put("/task/:id", bodyParser.json(), updateTask);
router.get("/task/filter", filterTasks);

module.exports = router;

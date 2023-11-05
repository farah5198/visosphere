const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// Create a simple in-memory database of tasks
const tasks = [];
// Add a middleware to parse JSON data in the request body
app.use(bodyParser.json());
// Define a route for creating a new task
app.post("/tasks", (req, res) => {
  const task = {
    text: req.body.text,
    status: "pending",
    createdAt: new Date(),
  };
    task.id = tasks.length + 1;
    tasks.push(task);
    res.json(task);

});
// Define a route for getting all tasks
app.get("/tasks/all", (req, res) => {
  res.json(tasks);
});
// Define a route for getting all tasks with the most recently added tasks at the top.
app.get("/tasks/recent", (req, res) => {
  // Sort the tasks in reverse chronological order
  const sortedTasks = tasks.sort((a, b) => b.createdAt - a.createdAt);
  res.json(sortedTasks);
});
// Define a route for getting a single task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  });
// Define a  route to filter the tasks by status
app.get("/tasks/:status", (req, res) => {
    const tasks = tasks.filter((task) => task.status === req.params.status);
    res.json(tasks);
});
// Define a route for updating a task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
  
    if (task) {
      task.title = req.body.title;
      task.description = req.body.description;
      task.status = req.body.status;
  
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
});
// Define a route for deleting a task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
  
    if (index > -1) {
      tasks.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send("Task not found");
    }
});
// Start the server
app.listen(3000, () => {
console.log("Server listening on port 3000");
});

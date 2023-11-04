const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// Create a simple in-memory database of tasks
const tasks = [];
// Add a middleware to parse JSON data in the request body
app.use(bodyParser.json());
// Define a route for creating a new task
app.post("/tasks", (req, res) => {
// write your code here
});
// Define a route for getting all tasks
app.get("/tasks", (req, res) => {
res.json(tasks);
});
// Define a route for getting a single task by ID
app.get("/tasks/:id", (req, res) => {
// write your code here
});
// Define a route for updating a task
app.put("/tasks/:id", (req, res) => {
// write your code here
});
// Define a route for deleting a task
app.delete("/tasks/:id", (req, res) => {
// write your code here
});
// Start the server
app.listen(3000, () => {
console.log("Server listening on port 3000");
});

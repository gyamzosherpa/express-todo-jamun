// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// // Load the environment variables from the .env file
// dotenv.config();

// // Access the environment variables
// const { MONGODB_URI } = process.env;

// // Connect to MongoDB using Mongoose
// mongoose
//   .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// const Todo = mongoose.model("todos", {
//   name: String,
//   status: {
//     type: String,
//     enum: ["Todo", "In Progress", "Done"],
//   },
// });
// //const User = mongoose.model("users", { username: String, password: String });

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));

// //const todos = ["learn html", "learn css"];

// // --------------------- get all datas ---------------------- //
// app.get("/", async (req, res) => {
//   const todos = await Todo.find();
//   //console.log(todos);
//   res.render("index", {
//  //   todos,
//     search: null,
//   });
// });

// // --------------------------- post data -------------------- //
// app.post("/todos", async (req, res) => {
//   if (req.body.todoItem && req.body.todoItem.length >= 3) {
//     try {
//       await Todo.create({ name: req.body.todoItem, status: req.body.status });
//       res.redirect("/");
//     } catch (error) {
//       console.error("Error creating the Todo:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   } else {
//     const errorMessage =
//       "Invalid todoItem. It must be at least 3 characters long.";
//     res.status(400).send(errorMessage);
//   }
// });

// // ---------------------------- update ------------------------- //
// app.get("/todos/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const todo = await Todo.findById(id);
//   res.render("edit", {
//  //   todo,
//   });
// });

// app.post("/todos/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const updatedTodo = req.body.updatedTodo;

//   // Update the todo item in the database
//   await Todo.findByIdAndUpdate(id, {
//     name: updatedTodo,
//     status: req.body.status,
//   });

//   res.redirect("/");
// });

// // -------------------------- search ------------------------------ //
// app.get("/todos", async (req, res) => {
//   const { search, status } = req.query;
//   let filter = {};

//   if (search) {
//     // Use the $or operator to search for name or status
//     filter.$or = [
//       { name: { $regex: search, $options: "i" } },
//       { status: { $regex: search, $options: "i" } },
//     ];
//   }

//   try {
//     const filteredTodos = await Todo.find(filter);
//     res.render("index", {
//   //    todos: filteredTodos,
//       search,
//       status,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // ----------------- Server runs ------------------------- //

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Import the database configuration
const connectToDatabase = require("./config/mongodb");

// Connect to the MongoDB database
connectToDatabase();

//  Import the controller
const todoController = require("./controllers/todoController");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", todoController.getAllTodos);
app.post("/todos", todoController.createTodo);
app.get("/todos/edit/:id", todoController.editTodo);
app.post("/todos/edit/:id", todoController.updateTodo);
app.get("/todos", todoController.searchTodos);
app.post("/todos/delete/:id", todoController.deleteTodo);

// Server runs
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

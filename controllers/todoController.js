const Todo = require("../models/Todo");

// routes handling
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("index", {
      todos,
      search: null,
    });
    //res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Handle todo creation
exports.createTodo = async (req, res) => {
  if (req.body.todoItem && req.body.todoItem.length >= 3) {
    try {
      await Todo.create({ name: req.body.todoItem, status: req.body.status });
      res.redirect("/");
    } catch (error) {
      console.error("Error creating the Todo:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    const errorMessage =
      "Invalid todoItem. It must be at least 3 characters long.";
    res.status(400).send(errorMessage);
  }
};

// edit todo
exports.editTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.render("edit", { todo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Handle todo update
exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body.updatedTodo;

  try {
    // Update the todo item in the database
    await Todo.findByIdAndUpdate(id, {
      name: updatedTodo,
      status: req.body.status,
    });

    res.redirect("/");
  } catch (error) {
    console.error("Error updating the Todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

//  get todo search
exports.searchTodos = async (req, res) => {
  const { search, status } = req.query;
  let filter = {};

  if (search) {
    // Use the $or operator to search for name or status
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { status: { $regex: search, $options: "i" } },
    ];
  }

  try {
    const filteredTodos = await Todo.find(filter);
    res.render("index", {
      todos: filteredTodos,
      search,
      status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

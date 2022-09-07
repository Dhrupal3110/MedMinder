const express = require("express");
const router = express.Router();
const fatchuser = require("../middleware/fatchuser");
const Todos = require("../models/Todo");
const { body, validationResult } = require("express-validator");

//Route:1- get all the otes using:GET "/api/todos/getuser"-  userlogin require
 
router.get("/fatchalltodos", fatchuser, async (req, res) => {
  try {
    const todos = await Todos.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurd");
  }
});
//Route:2- add todos using:GET "/api/todos/addtodo"-  userlogin require

router.post(
  "/addtodo",
  fatchuser,
  [
    body("title", "enter velid title ").isLength({ min: 5 }),
    body("description", "description must atleast 5 charactor").isLength({    
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, teg } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const todo = new Todos({
        title,
        description,
        teg,
        user: req.user.id,
      });
      const savedtodo = await todo.save();

      res.json(savedtodo);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occurd");
    }
  }
);
//Route:3- update todo using:PUT "/api/todos/updatetodo"-  userlogin require
router.put("/updateTodo/:id", fatchuser, async (req, res) => {
  try {
    const { title, description, teg } = req.body;
    const newTodo = {};
    if (title) {
        newTodo.title = title;
    }
    if (description) {
        newTodo.description = description;
    }
    if (teg) {
        newTodo.teg = teg;
    }

    //find the todo to be uploaded to be update
    let todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not found");
    }
    // console.log(todo.user.toStrimg());
    if (todo.user.toString() != req.user.id) {
      return res.status(401).send("not allowed");
    }
    todo = await Todos.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).send("some error occurd" + error);
  }
});
//Route:4- Delete todo using:DELET "/api/todos/delettodo"-  userlogin require
router.delete("/deletetodo/:id", fatchuser, async (req, res) => {
  try {
    //find the todo to be delete to be deleted
    let todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not found");
    }
    //Allow deletion only if users owens this todo
    if (todo.user.toString() != req.user.id) {
      return res.status(401).send("not allowed");
    }
    todo = await Todos.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "todo will be deleted", todo: todo });
  } catch (error) {
    res.status(500).send("some error occurd" + error);
  }
});

module.exports = router;

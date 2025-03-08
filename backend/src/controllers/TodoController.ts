import { Request, Response } from "express";
import moment from "moment";
import Todo from "../Schemas/models/Todo";
import UserModel from "../Schemas/models/User";
import mongoose from "mongoose";

export const addToDo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;
    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });
    const savedTodo = await newTodo.save();
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.todos.push(newTodo._id as mongoose.Types.ObjectId);
    await user.save();

    res
      .status(200)
      .json({ message: "Todo added successfully", todo: savedTodo });
    return;
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Todo not added" });
  }
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).populate("todos");
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const toggleTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status,
      },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Todo is toggled successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTodoByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.params;

    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`),
      },
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getTodosCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    }).exec();

    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    res.status(500).json({ error: "Network error" });
  }
};

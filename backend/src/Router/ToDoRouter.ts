import { Router } from "express"; 
import { addToDo,  getTodoByDate, getTodos,getTodosCount, toggleTodo } from "../controllers/TodoController";

const todoRouter = Router();

todoRouter.post("/:id", addToDo);//checked
todoRouter.get("/:id/todos", getTodos);//checked
todoRouter.patch("/:todoId/toggle", toggleTodo);//checked
todoRouter.get("/completed/:date", getTodoByDate);
todoRouter.get("/count", getTodosCount);//checked


export default todoRouter
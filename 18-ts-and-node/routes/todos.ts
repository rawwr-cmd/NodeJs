import { Router, Request } from "express";

import { Todo } from "../models/todo";

const todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  req.status(200).json({ todos: todos });
});

export default router;

import { Request, Response, NextFunction } from "express";
import { responseMessages } from "../utils/responseMessages.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro:", err);

  const response = responseMessages(req.path, req.method, 500);
  res.status(500).json(response);
};

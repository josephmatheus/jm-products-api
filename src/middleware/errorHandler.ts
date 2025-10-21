import { responseMessages } from "../utils/responseMessages.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Erro:", err);

  const response = responseMessages(req.path, req.method, 500);
  res.status(500).json(response);
};

import express from "express";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorHandler";

const port = 3000;
const app = express();

app.use(express.json());
app.use("/", productRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

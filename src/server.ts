import express from "express";

const port = 3000;
const app = express();

app.get("/products", (req, res) => {
  res.send("Listagem de produtos");
});

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

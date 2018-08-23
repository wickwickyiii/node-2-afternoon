require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const pc = require("./products_controller");
const app = express();
const port = 3000;

app.use(json());
massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log("ERROR", err));

app.get("/api/product/:id", pc.getOne);
app.get("/api/products", pc.getAll);
app.put("/api/product/:id", pc.update);
app.post("/api/product", pc.create);
app.delete("/api/product/:id", pc.delete);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

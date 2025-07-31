const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const user = require("./routes/user");
const product = require("./routes/product");
const category = require("./routes/category_product");
const favorites = require("./routes/favorite");
app.use("/users", user);
app.use("/products", product);
app.use("/categories", category);
app.use("/favorites", favorites);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

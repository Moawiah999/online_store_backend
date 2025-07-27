const express = require("express");
const { addCategoryProducts } = require("../controllers/category_product");

const categoryProductsRouter = express.Router();

categoryProductsRouter.post("/add", addCategoryProducts);
module.exports = categoryProductsRouter;

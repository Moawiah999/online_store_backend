const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  addProduct,
  getAllProduct,
  getProductById,
} = require("../controllers/product");

const productRoute = express.Router();
productRoute.post("/add", upload.single("product_image"), addProduct);
productRoute.get("/", getAllProduct);
productRoute.get("/:id", getProductById);
module.exports = productRoute;

const express = require("express");
const {
  addFavoriteProduct,
  getFavoriteProduct,
  deleteFavoriteProduct,
} = require("../controllers/favorite");

const favoriteRouter = express.Router();
favoriteRouter.post("/add/:user_id/:product_id", addFavoriteProduct);
favoriteRouter.get("/:user_id", getFavoriteProduct);
favoriteRouter.delete("/delete/:user_id/:product_id", deleteFavoriteProduct);

module.exports = favoriteRouter;

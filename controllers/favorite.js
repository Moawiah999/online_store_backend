const client = require("../models/db");

// Add a product to user's favorites
const addFavoriteProduct = (req, res) => {
  const { user_id, product_id } = req.params;

  const query = `
    INSERT INTO favorites (user_id, product_id)
    VALUES ($1, $2)
  `;

  const data = [user_id, product_id];

  client
    .query(query, data)
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Product added to favorites successfully.",
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Failed to add product to favorites.",
      });
    });
};

const getFavoriteProduct = (req, res) => {
  const { user_id, product_id } = req.params;

  const query = `
    SELECT products.product_name, products.product_image, products.price_product
    FROM favorites
    INNER JOIN products ON favorites.product_id = products.id
    WHERE favorites.user_id = $1 AND favorites.product_id = $2
  `;

  const data = [user_id, product_id];

  client
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        product: result.rows[0],
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Failed to fetch favorite product.",
      });
    });
};
const deleteFavoriteProduct = (req, res) => {
  const { user_id, product_id } = req.params;

  const query = `DELETE FROM favorites WHERE user_id = $1 AND product_id=$2`;
  const data = [user_id, product_id];

  client
    .query(query, data)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "The product has been successfully removed from favorites",
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Failed to remove product from favorites",
      });
    });
};
module.exports = {
  addFavoriteProduct,
  getFavoriteProduct,
  deleteFavoriteProduct,
};

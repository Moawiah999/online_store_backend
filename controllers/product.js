const client = require("../models/db");

const addProduct = (req, res) => {
  const { product_name, price_product, information_product, category_id } =
    req.body;
  const imageFile = req.file;

  const imageBuffer = imageFile.buffer;

  const query = `
    INSERT INTO products (product_name, product_image, price_product, information_product ,category_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const data = [
    product_name,
    imageBuffer,
    price_product,
    information_product,
    category_id,
  ];

  client
    .query(query, data)
    .then((result) => {
      res.status(201).json({ message: "Product added", data: result.rows });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error adding product" });
    });
};
const getAllProduct = (req, res) => {
  const query =
    "SELECT id,product_name,product_image,price_product,information_product from products";
  client
    .query(query)
    .then((result) => {
      const products = result.rows.map(function (elements) {
        return {
          ...elements,
          product_image: elements.product_image.toString("base64"),
        };
      });
      res.status(200).json({
        data: products,
      });
    })
    .catch((err) => {
      console.error("Error retrieving products:", err.message);
      res.status(500).json({ message: "Failed to fetch products" });
    });
};

module.exports = { addProduct, getAllProduct };

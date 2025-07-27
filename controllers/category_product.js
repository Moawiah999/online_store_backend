const client = require("../models/db");
const addCategoryProducts = (req, res) => {
  const { name_category } = req.body;
  const query =
    "insert into product_category ( name_category) VALUES ($1) RETURNING *";
  const data = [name_category];
  client
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        state: true,
        message: "add category successfully",
        data: result.rows,
      });
    })
    .catch(() => {
      res.status(500).json({ status: false, message: "Internal server error" });
    });
};
module.exports = { addCategoryProducts };

const client = require("../models/db");

const addColors = (req, res) => {
  console.log("aaaaaaaa");

  const { color } = req.body;
  const query = "INSERT INTO colors (color) VALUES ($1)";
  const data = [color.toLowerCase()];
  client
    .query(query, data)
    .then(() => {
      res.status(201).json({
        status: true,
        message: "color add successfully",
      });
    })
    .catch((e) => {
      console.log(e);

      res.status(500).json({ status: false, message: "failed add color" });
    });
};
module.exports = { addColors };

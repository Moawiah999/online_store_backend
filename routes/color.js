const express = require("express");
const { addColors } = require("../controllers/color");
const colorsRouter = express.Router();
colorsRouter.post("/add", addColors);
module.exports = colorsRouter;

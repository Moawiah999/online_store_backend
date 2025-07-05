const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const user = require("./routes/user");
app.use("/users", user);

app.listen(PORT, () => {
  
  console.log(`Server listening at http://localhost:${PORT}`);
});

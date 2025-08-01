const client = require("../models/db");
const bcrypt = require("bcryptjs");
const registration = async (req, res) => {
  console.log("registration");

  const { username, email, password } = req.body;
  console.log(username, email, password);

  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *
  `;
  const pas = await bcrypt.hashSync(password.toLowerCase(), 5);

  const data = [username.toLowerCase(), email.toLowerCase(), pas];

  client
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        status: true,
        message: "User registered successfully",
        data: result.rows[0],
      });
    })
    .catch((err) => {
      if (err.code == "23505") {
        res
          .status(400)
          .json({ status: false, message: "Email already in use" });
      } else {
        res.status(500).json({ status: false, message: "Registration failed" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT id,email,password,username FROM users WHERE email = $1";
  const data = [email.toLowerCase()];

  client
    .query(query, data)
    .then(async (result) => {
      if (result.rows.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: "Email not found" });
      }
      const hashedPassword = result.rows[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        res.status(200).json({ status: true, data: result.rows[0] });
      } else {
        res
          .status(401)
          .json({ status: false, message: "Invalid email or password" });
      }
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Internal server error" });
      console.log(e);
    });
};
const delete_user = (req, res) => {
  const { email } = req.body;
  const query = "DELETE FROM users WHERE email=$1";
  const data = [email.toLowerCase()];
  client
    .query(query, data)
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Account deleted successfully" });
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Internal server error" });
      console.log(e);
    });
};
module.exports = { registration, login, delete_user };

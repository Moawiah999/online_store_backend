const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.user,
  host: process.env.localhost,
  database: process.env.databaseName,
  password: process.env.password,
  port: process.env.portDataBase,
});

client
  .connect()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log("Database connection failed: ", e);
  });

module.exports = client;

const createTable = () => {
  client
    .query(
      `
      create table users (
        id SERIAL PRIMARY KEY , 
        username VARCHAR(20),
        email VARCHAR(25) UNIQUE,
        password VARCHAR,
        image_user BYTEA
      );

      create table product_category(
        id SERIAL PRIMARY KEY,
        name_category VARCHAR(30)
      );

      create table products(
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(30) NOT NULL,
        product_image BYTEA NOT NULL,
        price_product INT NOT NULL,
        information_product VARCHAR(200) NOT NULL,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES product_category(id)
      );
      create table carts(
        id SERIAL PRIMARY KEY,
        number_products INT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
      create table favorites(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
      create table orders(
        id SERIAL PRIMARY KEY,
        number_products INT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `
    )
    .then(() => {
      console.log("create table successfully");
    })
    .catch((e) => {
      console.log("Failed to create tables , ", e);
    });
};

// createTable();

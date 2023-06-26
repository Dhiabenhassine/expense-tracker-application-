const express = require("express");
const cors = require("cors");
const { conn } = require("./db/db");
const { readdirSync } = require("fs");

const Expense = require("./model/expenseModel");
const Income = require("./model/incomeModel");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

//routes
readdirSync("./routes").map((route) =>
  app.use("/home", require("./routes/" + route))
);

const server = () => {
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();

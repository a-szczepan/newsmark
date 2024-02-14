require("dotenv").config();
const cors = require("cors");
const mysql = require("mysql2");
const cookies = require("cookie-parser");
const express = require("express");
const db = require("./database/db");
const { getPaths } = require("./routes/routes");
const { deserializeUser } = require("./middleware/deserializeUser");

const app = express();

const corsOptions = {
  origin: "https://newsmark.szczpanczyk.tech/",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookies());
app.use(express.json());
app.use(deserializeUser);
app.use(getPaths());

const run = async () => {
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Sync done");
    app.listen(5000, () =>
      console.log(`Server running on port ${process.env.DEV_PORT}`)
    );
  });
};

run();

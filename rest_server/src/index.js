const express = require("express");
const app = express();
const router = require("./router");
const dotnev = require("dotenv");

dotnev.config();

app.use(express.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use("/", router);

app.listen(process.env.PORT, function() {
  console.log(`Marketplace service listening on port ${process.env.PORT}!`);
});

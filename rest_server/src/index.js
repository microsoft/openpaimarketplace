const express = require("express");
const app = express();
const router = require("./router");
const dotnev = require("dotenv");
const bodyParser = require("body-parser");

dotnev.config();

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/plain" }));

app.get("/", function(req, res) {
  res.send("Welcome to marketplace!");
});

app.use("/", router);

app.listen(process.env.PORT, function() {
  console.log(`Marketplace service listening on port ${process.env.PORT}!`);
});

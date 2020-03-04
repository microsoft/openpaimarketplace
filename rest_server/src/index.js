const express = require("express");
const app = express();
const router = require("./router");
const init = require("./init");

app.use(express.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use("/", router);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

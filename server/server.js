const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Work");
});

app.get("/questions.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "", "questions.json"));
});

app.post("/", (req, res) => {
  fs.writeFileSync("questions.json", `${JSON.stringify(req.body)}`);
  res.send("POST request to the homepage");
  console.log(req.body);


  
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});

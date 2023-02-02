import express from "express";
import { appendFileSync, readFileSync } from "fs";
const app = express();

app.use(express.static("."));
app.use(express.json());

app.post("/api/registration", (req, res) => {
  let text = readFileSync("test.txt", "utf8");
  if (
    text.match(req.body.email) != null ||
    req.body.emailPassword.length == 0 ||
    req.body.cardNumber.length == 0
  ) {
    res.sendStatus(500);
  } else {
    appendFileSync("test.txt", JSON.stringify(req.body) + "\n");
    res.sendStatus(201);
  }
});

app.listen(3000, () => {
  console.log("Server work");
});

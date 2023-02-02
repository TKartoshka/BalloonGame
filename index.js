import express from "express";
import { appendFileSync, readFileSync } from "fs";
const app = express();

app.use(express.static("."));
app.use(express.json());
app.post("/statistics", (req, res) => {
    appendFileSync("statistics.txt",  JSON.stringify(req.body) + "\n")
    res.sendStatus(201);
})


app.listen(3000, () => {
    console.log("Server work");
  });
  
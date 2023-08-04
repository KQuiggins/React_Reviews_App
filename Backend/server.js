import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies

app.get("/", (req, res) => {
    res.send("Server is ready");
  });


  app.listen(5000, () => {
    console.log(`Server running`);
  });
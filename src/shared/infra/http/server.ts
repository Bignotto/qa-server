import "reflect-metadata";

import express from "express";
import routes from "./routes";

import "../typeorm";
import "../../container";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (request, response) => {
  response.json({
    message: "Big Rules!",
  });
});

app.listen(3333, () => {
  console.log("BIG RULES, server up on port 3333");
});

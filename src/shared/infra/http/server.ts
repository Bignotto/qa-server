import "reflect-metadata";

import express from "express";
import routes from "./routes";

//database
import "../typeorm";

//dependency injection
import "../../container";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (request, response) => {
  response.json({
    message: "QA-SERVER 🚀 Big 2020",
  });
});

app.listen(3333, () => {
  console.log("QA-SERVER: 🚀 server up on port 3333");
});

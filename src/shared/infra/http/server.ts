import "reflect-metadata";

import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routes";

import AppError from "../../errors/AppError";
//database
import "../typeorm";

//dependency injection
import "../../container";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.get("/", (request, response) => {
  response.json({
    message: "QA-SERVER 🚀 Big 2020",
  });
});

app.listen(3333, () => {
  console.log("QA-SERVER: 🚀 server up on port 3333");
});

import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.json({
    message: "Big Rules!",
  });
});

app.listen(3333, () => {
  console.log("BIG RULES, server up on port 3333");
});

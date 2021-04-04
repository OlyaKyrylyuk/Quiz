import express, { Application } from "express";
import Connection from "./database/connection";
import { QuizRouter } from "./routes/quizRoute";
import { QuestionRouter } from "./routes/questionRoute";
import { AnswerRouter } from "./routes/answerRoute";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import swaggerUI from "swagger-ui-express";

import * as swaggerDocument from "./swagger.json";
//import swaggerJsDoc from "swagger-jsdoc";

const app: Application = express();

/*const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: ["index.ts"],
};*/

const db = "mongodb://localhost:27017/Quiz";
Connection({ db });

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/", QuizRouter);
app.use("/questions/", QuestionRouter);
app.use("/answers/", AnswerRouter);

app.listen(3000, () => {
  console.log("server listening");
});

export default app;

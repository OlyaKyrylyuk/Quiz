import express, { Application, Request, Response } from "express";
import Connection from "./database/connection";
import { QuizRouter } from "./routes/quizRoute";
import { QuestionRouter } from "./routes/questionRoute";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
const app: Application = express();

const db = "mongodb://localhost:27017/Quiz";
Connection({ db });

app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use("/", QuizRouter);
app.use("/questions/", QuestionRouter);

app.listen(3000, () => {
  console.log("server listening");
});

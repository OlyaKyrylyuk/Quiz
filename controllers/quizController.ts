import { Request, Response, NextFunction } from "express";
import Quiz from "./../models/quiz";
import Answer from "./../models/answer";
import secret_token from "../security/secret_token";

export let getApiDocumentation = (req: Request, res: Response) => {
  res.send("Main page");
};

export let getAllQuizesAdmin = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let quizes = await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/admin/all", { quizes: quizes });
};

export let getAllQuizesUser = async (req: Request, res: Response) => {
  let quizes = await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/user/all_quizes", { quizes: quizes });
};

export let getFormAddQuiz = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/admin/add_quiz");
};

export let addQuiz = (req: Request, res: Response, next: NextFunction) => {
  const quiz_data = new Quiz({
    name: req.body.name,
  });
  quiz_data.save().then((result) => {
    res.redirect("/questions/add/quiz/" + result._id);
  });
};

export let statistics = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let quizes = await Quiz.aggregate([
    { $project: { name: "$name", count: { $size: "$answers" } } },
  ]);
  let quizes_with_answers = await Quiz.aggregate([
    {
      $match: {
        "answers.1": { $exists: true },
      },
    },
    {
      $count: "res",
    },
  ]);
  let quizes_without_answers = await Quiz.aggregate([
    {
      $match: { "answers.1": { $exists: false } },
    },
    {
      $count: "res",
    },
  ]);
  res.render("statistics", {
    data: quizes,
    quizes_with_answers: quizes_with_answers[0].res,
    quizes_without_answers: quizes_without_answers[0].res,
  });
};

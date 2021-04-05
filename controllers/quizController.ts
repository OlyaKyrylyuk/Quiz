import { Request, Response } from "express";
import Quiz from "../models/quiz";
import secret_token from "../security/secret_token";

export let getApiDocumentation = (req: Request, res: Response) => {
  res.send("api Documentation: localhost:3000/api-docs");
};

export let getAllQuizesAdmin = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let quizes = await Quiz.find((err: string, quizes: any) => {
    if (err) {
      res.send("Error!");
    } else {
      return res.render("quizes/admin/all", { quizes: quizes });
    }
  });
};

export let getAllQuizesUser = async (req: Request, res: Response) => {
  let quizes = await Quiz.find((err: string, quizes: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.render("quizes/user/all_quizes", { quizes: quizes });
    }
  });
};

export let getFormAddQuiz = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  res.render("quizes/admin/add_quiz");
};

export let addQuiz = (req: Request, res: Response) => {
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

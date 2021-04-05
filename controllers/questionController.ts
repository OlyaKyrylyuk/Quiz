import { Request, Response } from "express";
import Question from "../models/question";
import secret_token from "../security/secret_token";
import Quiz from "../models/quiz";

export let getFormQuestionAdd = (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  res.render("questions/admin/add_question", { id: req.params.id });
};

export let addQuestion = async (req: Request, res: Response) => {
  const question_data = new Question({
    questionContent: req.body.question,
    quiz_id: req.params.id,
  });
  await question_data.save();
  await Quiz.findByIdAndUpdate(
    req.params.id,
    { $push: { questions: question_data } },
    { new: true, useFindAndModify: false }
  );
  res.redirect("/admin/quizes");
};

export let getQuiz = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let data = await Quiz.findOne({ _id: req.params.id }).populate("questions");
  res.render("questions/admin/all", { questions: data });
};
export let getQuestion = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let data = await Quiz.findOne({ _id: req.params.id }).populate("answers");
  res.render("answers/admin/all", { answers: data });
};

export let passQuiz = async (req: Request, res: Response) => {
  let data = await Quiz.findOne({ _id: req.params.id }).populate("questions");
  res.render("answers/user/add", { questions: data });
};

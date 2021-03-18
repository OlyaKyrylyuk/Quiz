import express, { Request, Response, NextFunction } from "express";
import Question from "../models/question";

import { QuizRouter } from "./quizRoute";
import secret_token from "../security/secret_token";
import Answer from "./../models/answer";
import Quiz from "./../models/quiz";

const router = express.Router();

router.route("/add/quiz/:id").get((req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  res.render("questions/admin/add_question", { id: req.params.id });
});
router.route("/add").post(async (req: Request, res: Response) => {
  const question_data = new Question({
    questionContent: req.body.question,
    quiz_id: req.body.quize_id,
  });
  await question_data.save();
  await Quiz.findByIdAndUpdate(
    req.body.quize_id,
    { $push: { questions: question_data } },
    { new: true, useFindAndModify: false }
  );
  res.redirect("/admin/quizes");
});
router.route("/quiz/:id").get(async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let data = await Quiz.findOne({ _id: req.params.id }).populate("questions");
  if (data != null) {
    Question.find()
      .where("quiz_id")
      .equals(data._id)
      .populate("answers")
      .then((res) => {
        console.log(res);
      });
    /*data.questions.forEach((question)=>{
      Answer.find().where('question_id').equals(question._id).then(

      )
    })*/
  }
  res.render("questions/admin/all", { questions: data });
});

router.route("/pass/quiz/:id").get(async (req: Request, res: Response) => {
  let data = await Quiz.findOne({ _id: req.params.id }).populate("questions");
  res.render("answers/user/add", { questions: data });
});
//router.route("/questions/quiz/:id");
export { router as QuestionRouter };

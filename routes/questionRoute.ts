import express, { Request, Response, NextFunction } from "express";
import Question from "./../models/question";
import Quiz from "./../models/quiz";
import { QuizRouter } from "./quizRoute";

const router = express.Router();

router.route("/add/quiz/:id").get((req: Request, res: Response) => {
  res.render("questions/add_question", { id: req.params.id });
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
  res.redirect("/quizes");
});
router.route("/quiz/:id").get(async (req: Request, res: Response) => {
  let data = await Quiz.findOne({ _id: req.params.id }).populate("questions");
  res.render("questions/all", { questions: data });
});
router.route("/questions/quiz/:id");
export { router as QuestionRouter };

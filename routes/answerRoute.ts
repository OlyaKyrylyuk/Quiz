import { Options } from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import { constants } from "node:fs";
import Answer from "./../models/answer";
import Question from "./../models/question";
import Quiz from "./../models/quiz";

const router = express.Router();

router.route("/add/:id").post(async (req: Request, res: Response) => {
  let Array_data: any = [];
  let questions = Quiz.findOne({ _id: req.params.id })
    .populate("questions")
    .then((data) => {
      if (data !== null) {
        data.questions.forEach((res, index) => {
          const answer_data = new Answer({
            answerContent: req.body.answers[index],
            question_id: res._id,
          });
          Array_data.push(answer_data);
        });
      }
    })
    .then(() => {
      Array_data.forEach((arr: any) => {
        arr.save();
        Question.findByIdAndUpdate(
          arr.question_id,
          { $push: { answers: arr } },
          { new: true, useFindAndModify: false }
        );
      });
    })
    .then(() => {
      res.redirect("/quizes");
    });
});

export { router as AnswerRouter };

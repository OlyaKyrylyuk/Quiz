import { Request, Response } from "express";
import Quiz from "../models/quiz";
import Answer from "../models/answer";
import Question from "../models/question";

export let addAnswer = async (req: Request, res: Response) => {
  let Array_data: any = [];
  Quiz.findOne({ _id: req.params.id })
    .populate("questions")
    .then((data) => {
      if (data !== null) {
        data.questions.forEach((res, index) => {
          let answer_data = new Answer({
            answerContent: req.body.answers[index],
            question_id: res._id,
            quiz_id: req.params.id,
          });
          Array_data.push(answer_data);
        });
      }
    })
    .then(() => {
      Array_data.forEach((arr: any) => {
        arr.save();
      });
    })
    .then(() => {
      Array_data.forEach(async (arr: any) => {
        let result = await Question.findById(arr.question_id);
        if (result != null) {
          result.answers.push(arr);
          await result.save();
        }
        let result2 = await Quiz.findById(arr.quiz_id);
        if (result2 != null) {
          result2.answers.push(arr);
          await result2.save();
        }
      });
    })

    .then(() => {
      res.redirect("/quizes");
    });
};

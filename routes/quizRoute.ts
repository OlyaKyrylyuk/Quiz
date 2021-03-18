import { Options } from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import Quiz from "./../models/quiz";
import Answer from "./../models/answer";
import { AnswerRouter } from "./answerRoute";
import secret_token from "../security/secret_token";

/*var headers:string = {
  'Bearer': secret_token
};*/
const router = express.Router();

router.route("/").get(async (req: Request, res: Response) => {
  res.send("Main page");
});

router.route("/admin/quizes").get(async (req: Request, res: Response) => {
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
});
router.route("/quizes").get(async (req: Request, res: Response) => {
  let quizes = await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/user/all_quizes", { quizes: quizes });
});

router
  .route("/admin/quizes/add")
  .get(async (req: Request, res: Response) => {
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
  })

  .post((req: Request, res: Response, next: NextFunction) => {
    const quiz_data = new Quiz({
      name: req.body.name,
      link: req.body.link,
    });
    quiz_data.save().then((result) => {
      res.redirect(`/questions/add/quiz/` + result._id);
    });
  });

router.route("/statisctics").get((req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let quizes = Quiz.find();
});
export { router as QuizRouter };

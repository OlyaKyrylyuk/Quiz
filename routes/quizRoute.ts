import { Options } from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import Quiz from "./../models/quiz";

const router = express.Router();

router.route("/").get(async (req: Request, res: Response) => {
  res.send("Main page");
});
router.route("/quizes").get(async (req: Request, res: Response) => {
  let quizes = await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/all", { quizes: quizes });
});

router
  .route("/quizes/add")
  .get(async (req: Request, res: Response) => {
    await Quiz.find((err: string) => {
      if (err) {
        res.send("Error!");
      } else {
        console.log("Data is found");
      }
    });
    res.render("quizes/add_quiz");
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

export { router as QuizRouter };

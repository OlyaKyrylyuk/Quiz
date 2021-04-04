import express from "express";
import * as questionController from "./../controllers/questionController";

const router = express.Router();

router.get("/add/quiz/:id", questionController.getFormQuestionAdd);
router.post("/add/:id", questionController.addQuestion);
router.get("/quiz/:id", questionController.getQuiz);
router.get("/question/:id", questionController.getQuestion);
router.get("/pass/quiz/:id", questionController.passQuiz);

export { router as QuestionRouter };

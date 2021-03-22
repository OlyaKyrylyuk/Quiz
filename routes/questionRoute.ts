import express from "express";
import * as questionController from "./../controllers/questionController";

const router = express.Router();

router.get("/add/quiz/:id", questionController.getFormQuestionAdd);
router.post("/add", questionController.addQuestion);
router.post("/quiz/:id", questionController.getQuiz);
router.get("/pass/quiz/:id", questionController.passQuiz);

export { router as QuestionRouter };

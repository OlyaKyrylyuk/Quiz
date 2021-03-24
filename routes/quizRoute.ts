import express from "express";
import * as quizController from "./../controllers/quizController";

const router = express.Router();

router.get("/", quizController.getApiDocumentation);
router.get("/admin/quizes", quizController.getAllQuizesAdmin);
router.get("/quizes", quizController.getAllQuizesUser);
router.get("/admin/quizes/add", quizController.getFormAddQuiz);
router.post("/admin/quizes/add", quizController.addQuiz);
router.get("/statistics", quizController.statistics);

export { router as QuizRouter };

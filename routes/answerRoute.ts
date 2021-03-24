import express from "express";
import * as answerController from "./../controllers/answerController";

const router = express.Router();

router.post("/add/:id", answerController.addAnswer);

export { router as AnswerRouter };

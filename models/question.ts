import mongoose from "mongoose";
import { IAnswer } from "./answer";

export interface IQuestion extends mongoose.Document {
  questionContent: string;
  quiz_id: mongoose.Types.ObjectId;
  answers: Array<IAnswer>;
}

export let QuestionSchema = new mongoose.Schema({
  questionContent: { type: String, required: true },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Question;

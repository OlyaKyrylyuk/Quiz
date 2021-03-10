import mongoose from "mongoose";
import { IQuestion } from "./question";

export interface IQuiz extends mongoose.Document {
  name: string;
  link: string;
  questions: Array<IQuestion>;
}

export let QuizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
export default Quiz;

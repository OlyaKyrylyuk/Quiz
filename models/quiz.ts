import mongoose from "mongoose";
import { IQuestion } from "./question";
import { IAnswer } from "./answer";

export interface IQuiz extends mongoose.Document {
  name: string;
  questions: Array<IQuestion>;
  answers: Array<IAnswer>;
}

export let QuizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

QuizSchema.index({username: 1 });
const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
export default Quiz;

import mongoose from "mongoose";

export interface IQuestion extends mongoose.Document {
  questionContent: string;
  quiz_id: mongoose.Types.ObjectId;
}

export let QuestionSchema = new mongoose.Schema({
  questionContent: { type: String, required: true },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

const Quiz = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Quiz;

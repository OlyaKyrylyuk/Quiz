import mongoose from "mongoose";

export interface IAnswer extends mongoose.Document {
  answerContent: string;
  question_id: mongoose.Types.ObjectId;
  quiz_id: mongoose.Types.ObjectId;
}

export let AnswerSchema = new mongoose.Schema({
  answerContent: { type: String, required: true },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);
export default Answer;

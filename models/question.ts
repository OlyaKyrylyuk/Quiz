import mongoose from "mongoose";

export interface IQuestion extends mongoose.Document {
  questionContent: string;
  quiz_id: mongoose.Types.ObjectId;
}

export let QuestionSchema = new mongoose.Schema({
  questionContent: { type: String, required: true },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Quiz = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Quiz;

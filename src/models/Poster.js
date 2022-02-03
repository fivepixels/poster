import mongoose from "mongoose";

const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    maxlength: 300,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  uniqueColor: {
    type: String,
    required: false,
    default: "#ffffff",
  },
  meta: {
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    rating: {
      type: Number,
      default: 2.5,
      required: true,
    },
    star: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Topic",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Poster = mongoose.model("Poster", posterSchema);
export default Poster;

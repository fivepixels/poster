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
    default: " ",
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  meta: {
    views: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    rating: {
      type: Number,
      default: 2.5,
      min: 0,
      max: 5,
      required: true,
    },
    star: {
      type: Number,
      default: 0,
      min: 0,
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

posterSchema.pre("save", function () {
  console.log(this);
  this.text = this.text.replace(" of ", "\\of");
});

const Poster = mongoose.model("Poster", posterSchema);
export default Poster;

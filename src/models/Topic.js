import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    requried: true,
    maxlength: 25,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    maxlength: 300,
    trim: true,
  },
  uniqueColor: {
    type: String,
    required: true,
    default: "#ffffff",
  },
  type: {
    type: String,
    required: true,
  },
  positions: [
    {
      type: String,
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toLocaleDateString,
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
  posters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Poster",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const preventOfError = (text) => {
  return text.replace("of", "\\of");
};

topicSchema.static("preventOfError", preventOfError);

topicSchema.pre("save", preventOfError);

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;

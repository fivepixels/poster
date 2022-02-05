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

topicSchema.pre("save", function () {
  this.description.replace(" of ", "\\of");
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;

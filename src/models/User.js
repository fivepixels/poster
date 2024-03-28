import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false,
    trim: true
  },
  socialOnly: {
    type: Boolean,
    default: false,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  location: {
    type: String
  },
  avatarUrl: {
    type: String,
    default: "/uploads/avatars/base-user.png",
    required: false
  },
  joinedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  posters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Poster"
    }
  ],
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic"
    }
  ]
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;

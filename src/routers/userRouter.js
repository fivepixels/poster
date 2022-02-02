import express from "express";

const userRotuer = express.Router();

userRotuer.route("/:username");
userRotuer.route("/:username/edit");

export default userRotuer;

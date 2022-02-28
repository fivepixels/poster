import Poster from "../models/Poster";
import Topic from "../models/Topic";
import User from "../models/User";

import { STATUS_CODE } from "./rootController";

import { Octokit } from "@octokit/core";
const octokit = new Octokit({ auth: process.env.GH_TOKEN });

const BASE_PUG_PATH = "../views/";
const POSTER_PUG_PATH = BASE_PUG_PATH + "posters/";

export const randomPoster = async (req, res) => {
  const posters = await Poster.find({}).populate("owner").populate("topic");

  const poster = posters[Math.floor(Math.random() * posters.length)];

  if (!poster) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "Random Poster",
      });
  }
  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "watch", {
    pageTitle: `RANDOM POSTER | ${poster.title}`,
    poster,
  });
};

export const watchPoster = async (req, res) => {
  const {
    params: { postername },
  } = req;

  const poster = await Poster.findOne({ title: postername })
    .populate("owner")
    .populate("topic");

  if (!poster) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "Poster",
      });
  }

  const response = await octokit.request("POST /markdown", {
    text: poster.text,
  });

  if (response.status !== 200) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(POSTER_PUG_PATH + "watch", {
        pageTitle: `Not Rendering`,
        errorMessage: "Error : Please refresh.",
      });
  }

  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "watch", {
    pageTitle: `${poster.owner.username} | ${poster.title}`,
    poster,
    content: response.data,
  });
};

export const getCreateNewPoster = (req, res) => {
  const {
    session: {
      loggedInUser: { username },
    },
  } = req;

  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "new", {
    pageTitle: "Create a New Poster",
    username,
  });
};

export const postCreateNewPoster = async (req, res) => {
  const {
    body: { topic, title, description, position },
    session: { loggedInUser },
  } = req;

  const topicOfPoster = await Topic.findOne({ title: topic });

  if (!topicOfPoster) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const user = await User.findById({ _id: loggedInUser._id }).populate(
    "posters"
  );

  for (let i = 0; i < user.posters.length; i++) {
    const element = user.posters[i];
    if (element.title === title) {
      return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE);
    }
  }

  const text = `# ${title}\n${description}`;

  const createdPoster = await Poster.create({
    title,
    description,
    text,
    position,
    topic: topicOfPoster._id,
    owner: req.session.loggedInUser._id,
  });

  req.session.loggedInUser.posters.push(createdPoster);

  const updatedUser = await User.findByIdAndUpdate(
    req.session.loggedInUser._id,
    {
      posters: req.session.loggedInUser.posters,
    }
  );

  topicOfPoster.posters.push(createdPoster);
  const updatedTopic = await Topic.findByIdAndUpdate(topicOfPoster._id, {
    posters: topicOfPoster.posters,
  });

  return res.sendStatus(STATUS_CODE.CREATED_CODE);
};

export const getEditPoster = async (req, res) => {
  const {
    params: { username, postername },
  } = req;

  const writeUser = await User.findOne({ username });

  if (String(writeUser._id) !== String(req.session.loggedInUser._id)) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "not-allow", {
        pageTitle: "NOT ALLOW",
        errorMessage: "You do not have permission to edit this poster.",
        sug: {
          location: `/${username}/${postername}`,
          text: "Watch Poster",
        },
      });
  }

  const user = await writeUser.populate("posters");
  const poster = await Poster.findOne({
    title: postername,
    owner: req.session.loggedInUser._id,
  });

  if (!poster) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "Poster",
      });
  }

  await poster.populate("owner");

  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "edit", {
    pageTitle: `Edit | ${postername}`,
    poster,
  });
};

export const postEditPoster = async (req, res) => {
  const {
    body: { editingUserId, text },
    params: { postername },
    session: {
      loggedInUser: { _id },
    },
  } = req;

  console.log("HI");
  if (_id !== editingUserId) {
    return res.sendStatus(STATUS_CODE.NOT_ACCEPTABLE_CODE);
  }

  const poster = await Poster.findOne({ title: postername });

  if (!poster) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const editingUser = await User.findById(_id).populate("posters");

  let no = true;
  for (let i = 0; i < editingUser.posters.length; i++) {
    const element = editingUser.posters[i];
    if (element.title === postername) {
      no = false;
    }
  }

  if (no) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const updatedPoster = await Poster.findOneAndUpdate(
    { title: postername },
    {
      text,
    }
  );

  console.log(text);
  console.log(updatedPoster);
  return res.sendStatus(STATUS_CODE.UPDATED_CODE);
};

export const deleteDeletePoster = async (req, res) => {
  const {
    params: { username, postername },
    session: { loggedInUser },
  } = req;

  const poster = await Poster.findOne({ title: postername });

  if (!poster) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  if (String(loggedInUser._id) !== String(poster.owner._id)) {
    return res.sendStatus(STATUS_CODE.NOT_ACCEPTABLE_CODE);
  }

  poster.populate("topic");

  const topic = await Topic.findById(poster.topic._id);

  for (let i = 0; i < topic.posters.length; i++) {
    const element = topic.posters[i];
    if (element.title === postername) {
      topic.posters.splice(i, 1);
    }
  }

  const updatedTopic = await Topic.findByIdAndUpdate(topic._id, {
    posters: topic.posters,
  });

  const user = await User.findById(loggedInUser._id);

  for (let i = 0; i < user.posters.length; i++) {
    const element = user.posters[i];
    if (element.title === postername) {
      user.posters.splice(i, 1);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, {
    posters: user.posters,
  });

  const deletePoster = await Poster.findByIdAndDelete(poster._id);

  loggedInUser.posters = updatedUser.posters;

  return res.sendStatus(STATUS_CODE.UPDATED_CODE);
};

export const posterExists = async (req, res) => {
  const {
    params: { postername },
    session: { loggedInUser },
  } = req;

  const user = await User.findById(loggedInUser._id).populate("posters");

  if (user.posters.length === 0) {
    return res.sendStatus(STATUS_CODE.OK_CODE);
  }

  for (let i = 0; i < user.posters.length; i++) {
    const element = user.posters[i];
    if (element.title === postername) {
      return res.sendStatus(STATUS_CODE.ALEADY_TAKEN_CODE);
    }
  }

  return res.sendStatus(STATUS_CODE.OK_CODE);
};

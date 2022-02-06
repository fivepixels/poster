import Poster from "../models/Poster";
import Topic from "../models/Topic";
import User from "../models/User";

import { STATUS_CODE } from "./rootController";

const BASE_PUG_PATH = "../views/";
const POSTER_PUG_PATH = BASE_PUG_PATH + "posters/";

export const randomPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(BASE_PUG_PATH + "random", {
    pageTitle: "Random POSTER : PosterName",
    type: "POSTER",
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

  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "watch", {
    pageTitle: `${poster.owner.username} | ${poster.title}`,
    poster,
  });
};

export const getCreateNewPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "new", {
    pageTitle: "Create a New Poster",
  });
};

export const psotCreateNewPoster = async (req, res) => {
  const {
    body: { topic, title, description },
  } = req;

  const topicOfPoster = await Topic.findOne({ title: topic });

  // Check if the topic of the poster does not exist.
  if (!topicOfPoster) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(POSTER_PUG_PATH + "new", {
        pageTitle: "Create a New Poster",
        errorMessage: `Topic : ${topic} : is not found. Please choose another topic. or create on?`,
      });
  }

  const user = await User.findById(res.locals.loggedInUser._id).populate(
    "posters"
  );

  // Check if the poster title doss already taken in all of the posters which are written by the user.
  let no = false;
  for (let i = 0; i < user.posters.length; i++) {
    const element = user.posters[i];
    if (element.title === title) {
      no = true;
      break;
    }
  }

  if (no) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(POSTER_PUG_PATH + "new", {
        pageTitle: "Create a New Poster",
        errorMessage: `Poster Title : ${title} is already taken in your posters. Please choose another poster title.`,
      });
  }

  // Create a Poster.
  const createdPoster = await Poster.create({
    title,
    description,
    topic: topicOfPoster._id,
    owner: req.session.loggedInUser._id,
  });

  // Add poster to User which is in the session.
  req.session.loggedInUser.posters.push(createdPoster);

  // Update user in the database.
  const updatedUser = await User.findByIdAndUpdate(
    req.session.loggedInUser._id,
    {
      posters: req.session.loggedInUser.posters,
    }
  );

  // Update topic in the database.
  topicOfPoster.posters.push(createdPoster);
  const updatedTopic = await Topic.findByIdAndUpdate(topicOfPoster._id, {
    posters: topicOfPoster.posters,
  });

  return res
    .status(STATUS_CODE.CREATED_CODE)
    .redirect(`/${req.session.loggedInUser.username}/${createdPoster.title}`);
};

export const getEditPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "edit", {
    pageTitle: "Username / PosterName",
  });
};

export const postEditPoster = (req, res) => {
  return res.end();
};

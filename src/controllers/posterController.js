import Poster from "../models/Poster";
import Topic from "../models/Topic";
import User from "../models/User";

import { STATUS_CODE } from "./rootController";

import md from "jstransformer-markdown-it";

const BASE_PUG_PATH = "../views/";
const POSTER_PUG_PATH = BASE_PUG_PATH + "posters/";

export const randomPoster = async (req, res) => {
  const posters = await Poster.find({}).populate("owner").populate("topic");

  const poster = posters[Math.floor(Math.random() * posters.length)];

  if (!poster) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "poster",
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

export const postCreateNewPoster = async (req, res) => {
  const {
    body: { topic, title, description },
  } = req;

  const topicOfPoster = await Topic.findOne({ title: topic });

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

  let no = false;
  for (let i = 0; i < user.posters.length; i++) {
    const element = user.posters[i];
    if (element.title === title) {
      return res
        .status(STATUS_CODE.BAD_REQUEST_CODE)
        .render(POSTER_PUG_PATH + "new", {
          pageTitle: "Create a New Poster",
          errorMessage: `Poster Title : ${title} is already taken in your posters. Please choose another poster title.`,
        });
      no = true;
    }
  }

  const text = `# ${title}`;
  const createdPoster = await Poster.create({
    title,
    description,
    text,
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

  return res
    .status(STATUS_CODE.CREATED_CODE)
    .redirect(`/${req.session.loggedInUser.username}/${createdPoster.title}`);
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
    params: { username, postername },
    body: { content },
  } = req;

  const writeUser = await User.findOne({ username });

  if (String(writeUser._id) !== String(req.session.loggedInUser._id)) {
    return res.sendStatus(STATUS_CODE.NOT_ACCEPTABLE_CODE);
  }

  const user = await writeUser.populate("posters");
  const poster = await Poster.findOne({
    title: postername,
    owner: req.session.loggedInUser._id,
  });

  if (!poster) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const editedPoster = await Poster.findOneAndUpdate(
    { title: postername },
    {
      text: content,
    }
  );

  return res
    .status(STATUS_CODE.UPDATED_CODE)
    .redirect(`/${username}/${postername}`);
};

export const posterExists = async (req, res) => {
  const {
    params: { postername },
    session: { loggedInUser },
  } = req;

  const user = await User.findById(loggedInUser._id);

  let no = false;
  for (let i = 0; i < user.posters.length; i++) {
    const element = user.posters[i];
    if (element.title === title) {
      return res.sendStatus(STATUS_CODE.ALEADY_TAKEN_CODE);
    }
  }

  if (!no) {
    return res.sendStatus(STATUS_CODE.OK_CODE);
  }
};

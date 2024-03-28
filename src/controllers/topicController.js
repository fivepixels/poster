import Topic from "../models/Topic";
import User from "../models/User";

const BASE_PUG_PATH = "../views/";
const TOPIC_PUG_PATH = BASE_PUG_PATH + "topics/";

import { STATUS_CODE } from "./rootController";

const topicTypes = ["Agree / Disagree", "Opinion", "Many Positions"];

export const randomTopic = async (req, res) => {
  const topics = await Topic.find({})
    .populate({
      path: "posters",
      populate: {
        path: "owner"
      }
    })
    .populate("owner");

  const topic = topics[Math.floor(Math.random() * topics.length)];

  if (!topic) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "Random topic"
      });
  }

  return res.status(STATUS_CODE.OK_CODE).render(TOPIC_PUG_PATH + "watch", {
    pageTitle: `RANDOM TOPIC | ${topic.title}`,
    topic
  });
};

export const watchTopic = async (req, res) => {
  const {
    params: { topicname }
  } = req;

  const topic = await Topic.findOne({ title: topicname })
    .populate({
      path: "posters",
      populate: {
        path: "owner"
      }
    })
    .populate("owner");

  if (!topic) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "Topic"
      });
  }

  return res.status(STATUS_CODE.OK_CODE).render(TOPIC_PUG_PATH + "watch", {
    pageTitle: `Topic | ${topic.title}`,
    topic
  });
};

export const getCreateNewTopic = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(TOPIC_PUG_PATH + "new", {
    pageTitle: "Create a New Topic"
  });
};

export const psotCreateNewTopic = async (req, res) => {
  const {
    body: { title, description, type }
  } = req;

  const sameTitleTopic = await Topic.find({ title });
  if (sameTitleTopic.length !== 0) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(TOPIC_PUG_PATH + "new", {
        pageTitle: "Create a New Topic",
        errorMessage: `Topic Title : ${title} is already taken. Please choose another title`
      });
  }

  if ((!type) in topicTypes) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(TOPIC_PUG_PATH + "new", {
        pageTitle: "Create a New Topic",
        errorMessage: `Topic Type : ${type} was not provided. Please select one ot Agree / Disagree, Opinion, and Many Position`
      });
  }

  const user = await User.findById(req.session.loggedInUser._id);

  try {
    const createdTopic = await Topic.create({
      title,
      description,
      type,
      owner: user
    });

    req.session.loggedInUser.topics.push(createdTopic);
    await User.findByIdAndUpdate(req.session.loggedInUser._id, {
      topics: req.session.loggedInUser.topics
    });

    return res.sendStatus(STATUS_CODE.CREATED_CODE);
  } catch (error) {
    console.log(error);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE);
  }
};

export const topicExists = async (req, res) => {
  const {
    params: { topicname }
  } = req;

  const topicExists = await Topic.exists({ title: topicname });

  if (!topicExists) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  if (topicExists) {
    return res.sendStatus(STATUS_CODE.FOUND_CODE);
  }
};

export const posterAlreadyTaken = async (req, res) => {
  const {
    params: { topicname, postername }
  } = req;

  const topic = await Topic.findOne({ title: topicname }).populate("posters");

  if (!topic) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  for (let i = 0; i < topic.posters.length; i++) {
    const element = topic.posters[i];
    if (element.title === postername) {
      return res.sendStatus(STATUS_CODE.ALEADY_TAKEN_CODE);
    }
  }

  return res.sendStatus(STATUS_CODE.OK_CODE);
};

export const getTopic = async (req, res) => {
  const {
    params: { topicname }
  } = req;

  const topic = await Topic.findOne({ title: topicname }, { type: true });

  if (!topic) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const type = topic.type;
  console.log(type);

  return res.send({ type });
};

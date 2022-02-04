import Topic from "../models/Topic";
import User from "../models/User";

const BASE_PUG_PATH = "../views/";
const TOPIC_PUG_PATH = BASE_PUG_PATH + "topics/";

import { STATUS_CODE } from "./rootController";

const topicTypes = ["Agree / Disagree", "Opinion", "Many Positions"];

export const randomTopic = (req, res) => {
  return res.render(BASE_PUG_PATH + "random", {
    pageTitle: "Random TOPIC : TopicName",
    type: "TOPIC",
  });
};

export const watchTopic = async (req, res) => {
  const {
    params: { topicname },
  } = req;

  const topic = await Topic.findOne({ title: topicname });

  if (!topic) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "Topic",
      });
  }

  return res.status(STATUS_CODE.OK_CODE).render(TOPIC_PUG_PATH + "watch", {
    pageTitle: "Topic / TopicName",
    topic,
  });
};

export const getCreateNewTopic = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(TOPIC_PUG_PATH + "new", {
    pageTitle: "Create a New Topic",
  });
};

export const psotCreateNewTopic = async (req, res) => {
  const {
    body: { title, description, uniqueColor, type },
  } = req;

  const sameTitleTopic = await Topic.find({ title });
  if (sameTitleTopic === []) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(TOPIC_PUG_PATH + "new", {
        pageTitle: "Create a New Topic",
        errorMessage: `Topic Title : ${title} is already taken. Please choose another title`,
      });
  }

  if (!type in topicTypes) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(TOPIC_PUG_PATH + "new", {
        pageTitle: "Create a New Topic",
        errorMessage: `Topic Type : ${type} was not provided. Please select one ot Agree / Disagree, Opinion, and Many Position`,
      });
  }

  const owner = req.session.loggedInUser._id;

  try {
    const createdTopic = await Topic.create({
      title,
      description,
      uniqueColor,
      type,
      owner,
    });

    req.session.loggedInUser.topics.push(createdTopic);

    return res
      .status(STATUS_CODE.CREATED_CODE)
      .redirect(`/topics/${createdTopic.title}`);
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(TOPIC_PUG_PATH + "new", {
        pageTitle: "Create a New Topic",
        errorMessage: `Error : ${error}`,
      });
  }
};

export const getEditTopic = async (req, res) => {
  const {
    params: { topicname },
  } = req;

  const topic = await Topic.findOne({ title: topicname });

  if (String(topic.owner._id) !== String(req.session.loggedInUser._id)) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "not-allow", {
        pageTitle: "NOT ALLOW",
        errorMessage: "You are not a owner of the topic.",
        sug: {
          text: "Write a poster with this topic?",
          location: `/new?topic=${topicname}`,
        },
      });
  }

  return res.status(STATUS_CODE.OK_CODE).render(TOPIC_PUG_PATH + "edit", {
    pageTitle: "TopicName",
    topic,
  });
};

export const postEditTopic = async (req, res) => {
  const {
    body: { title, description },
    params: { topicname },
  } = req;

  const topic = await Topic.findOne({ title: topicname });

  if (String(topic.owner._id) !== String(req.session.loggedInUser._id)) {
    return res.sendStatus(STATUS_CODE.NOT_ACCEPTABLE_CODE);
  }

  await Topic.findOneAndUpdate({
    title,
    description,
  });

  return res.status(STATUS_CODE.UPDATED_CODE).redirect(`/topics/${title}`);
};

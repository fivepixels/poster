import Topic from "../models/Topic";

const BASE_PUG_PATH = "../views/";
const TOPIC_PUG_PATH = BASE_PUG_PATH + "topics/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

const topicTypes = ["Agree / Disagree", "Opinion", "Many Positions"];

export const randomTopic = (req, res) => {
  return res.render(BASE_PUG_PATH + "random", {
    pageTitle: "Random TOPIC : TopicName",
    type: "TOPIC",
  });
};

export const watchTopic = (req, res) => {
  return res.render(TOPIC_PUG_PATH + "watch", {
    pageTitle: "Topic / TopicName",
  });
};

export const getCreateNewTopic = (req, res) => {
  return res.render(TOPIC_PUG_PATH + "new", {
    pageTitle: "Create a New Topic",
  });
};

export const psotCreateNewTopic = async (req, res) => {
  const {
    body: { title, description, uniqueColor, type },
  } = req;

  const sameTitleTopic = await Topic.find({ title });
  if (sameTitleTopic === []) {
    return res.status(BAD_REQUEST_CODE).render(TOPIC_PUG_PATH + "new", {
      pageTitle: "Create a New Topic",
      errorMessage: `Topic Title : ${title} is already taken. Please choose another title`,
    });
  }

  if (!type in topicTypes) {
    return res.status(BAD_REQUEST_CODE).render(TOPIC_PUG_PATH + "new", {
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

    return res.status(OK_CODE).redirect(`/topics/${createdTopic.title}`);
  } catch (error) {
    return res.status(BAD_REQUEST_CODE).render(TOPIC_PUG_PATH + "new", {
      pageTitle: "Create a New Topic",
      errorMessage: `Error : ${error}`,
    });
  }
};

export const getEditTopic = (req, res) => {
  return res.render(TOPIC_PUG_PATH + "edit", {
    pageTitle: "TopicName",
  });
};

export const postEditTopic = (req, res) => {
  return res.end();
};

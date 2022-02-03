const BASE_PUG_PATH = "../views/";
const TOPIC_PUG_PATH = BASE_PUG_PATH + "topics/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

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

export const psotCreateNewTopic = (req, res) => {
  return res.end();
};

export const getEditTopic = (req, res) => {
  return res.render(TOPIC_PUG_PATH + "edit", {
    pageTitle: "TopicName",
  });
};

export const postEditTopic = (req, res) => {
  return res.end();
};

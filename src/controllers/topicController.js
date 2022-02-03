const BASE_PUG_PATH = "../views/topics/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const watchTopic = (req, res) => {
  return res.render(BASE_PUG_PATH + "watch", {
    pageTitle: "Topic / TopicName",
  });
};

export const random = (req, res) => {
  return res.render(BASE_PUG_PATH + "random", {
    pageTitle: "Random Topic / TopicName",
  });
};

export const getCreateNewTopic = (req, res) => {
  return res.render(BASE_PUG_PATH + "new", {
    pageTitle: "Create a New Topic",
  });
};

export const psotCreateNewTopic = (req, res) => {
  return res.end();
};

export const getEditTopic = (req, res) => {
  return res.render(BASE_PUG_PATH + "edit", {
    pageTitle: "TopicName",
  });
};

export const postEditTopic = (req, res) => {
  return res.end();
};

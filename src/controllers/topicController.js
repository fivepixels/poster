const BASE_PUG_PATH = "../views/topics/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const watch = (req, res) => {
  return res.render(BASE_PUG_PATH + "watch");
};

export const random = (req, res) => {
  return res.render(BASE_PUG_PATH + "random");
};

export const getCreateNewTopic = (req, res) => {
  return res.render(BASE_PUG_PATH + "new");
};

export const psotCreateNewTopic = (req, res) => {
  return res.end();
};

export const getEdit = (req, res) => {
  return res.render(BASE_PUG_PATH + "edit");
};

export const postEdit = (req, res) => {
  return res.send("Edit Topic Page");
};

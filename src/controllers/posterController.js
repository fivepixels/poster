const BASE_PUG_PATH = "../views/posters/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const watch = (req, res) => {
  return res.render(BASE_PUG_PATH + "watch");
};

export const getCreateNewPoster = (req, res) => {
  return res.render(BASE_PUG_PATH + "new");
};

export const psotCreateNewPoster = (req, res) => {
  return res.end();
};

export const getEdit = (req, res) => {
  return res.render(BASE_PUG_PATH + "edit");
};

export const postEdit = (req, res) => {
  return res.send("Edit Poster Page");
};

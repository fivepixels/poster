const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const watch = (req, res) => {
  return res.send("Watch Poster Page");
};

export const getCreateNewPoster = (req, res) => {
  return res.send("Create new Poster Page");
};

export const psotCreateNewPoster = (req, res) => {
  return res.end();
};

export const getEdit = (req, res) => {
  return res.send("Edit Poster Page");
};

export const postEdit = (req, res) => {
  return res.send("Edit Poster Page");
};

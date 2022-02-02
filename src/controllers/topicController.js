const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const watch = (req, res) => {
  return res.send("Watch Topic Page");
};

export const getCreateNewTopic = (req, res) => {
  return res.send("Create new Topic Page");
};

export const psotCreateNewTopic = (req, res) => {
  return res.end();
};

export const getEdit = (req, res) => {
  return res.send("Edit Topic Page");
};

export const postEdit = (req, res) => {
  return res.send("Edit Topic Page");
};

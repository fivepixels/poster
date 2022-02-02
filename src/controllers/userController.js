const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const home = (req, res) => {
  return res.send("Home Page");
};

export const getJoin = (req, res) => {
  return res.send("Join Page");
};

export const postJoin = (req, res) => {
  return res.end();
};

export const getLogin = (req, res) => {
  return res.send("Get Login Page");
};

export const postLogin = (req, res) => {
  return res.end();
};

export const logout = (req, res) => {
  return res.redirect("/");
};

export const getWatch = (req, res) => {
  return res.send("Watch User Page");
};

export const getEdit = (req, res) => {
  return res.send("Edit User Page");
};

export const postEdit = (req, res) => {
  return res.end();
};

export const getSearch = (req, res) => {
  return res.send("Search Page");
};

export const postSearch = (req, res) => {
  return res.end();
};

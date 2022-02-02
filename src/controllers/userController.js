const BASE_PUG_PATH = "../views/users/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const getJoin = (req, res) => {
  return res.render(BASE_PUG_PATH + "join");
};

export const postJoin = (req, res) => {
  return res.end();
};

export const getLogin = (req, res) => {
  return res.render(BASE_PUG_PATH + "login");
};

export const postLogin = (req, res) => {
  return res.end();
};

export const logout = (req, res) => {
  return res.redirect("/");
};

export const watch = (req, res) => {
  return res.render(BASE_PUG_PATH + "profile");
};

export const getEdit = (req, res) => {
  return res.render(BASE_PUG_PATH + "edit");
};

export const postEdit = (req, res) => {
  return res.end();
};

const BASE_PUG_PATH = "../views/users/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const getJoin = (req, res) => {
  return res.render(BASE_PUG_PATH + "join", {
    pageTitle: "Join Poster",
  });
};

export const postJoin = (req, res) => {
  return res.end();
};

export const getLogin = (req, res) => {
  return res.render(BASE_PUG_PATH + "login", {
    pageTitle: "Sign in to Poster",
  });
};

export const postLogin = (req, res) => {
  return res.end();
};

export const logout = (req, res) => {
  return res.redirect("/");
};

export const watch = (req, res) => {
  return res.render(BASE_PUG_PATH + "profile", {
    pageTitle: "Username",
  });
};

export const getEdit = (req, res) => {
  return res.render(BASE_PUG_PATH + "edit", {
    pageTitle: "Edit / Username",
  });
};

export const postEdit = (req, res) => {
  return res.end();
};

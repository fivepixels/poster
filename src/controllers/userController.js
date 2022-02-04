import User from "../models/User";

const BASE_PUG_PATH = "../views/";
const USER_PUG_PATH = BASE_PUG_PATH + "users/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const getJoin = (req, res) => {
  return res.render(USER_PUG_PATH + "join", {
    pageTitle: "Sign up to Poster",
  });
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, confirmPassword, username, name, location },
  } = req;

  if (password !== confirmPassword) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errorMessage: `Password does not match.`,
    });
  }

  const sameEmailUser = await User.find({ email });
  if (sameEmailUser === []) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errorMessage: `Email : ${email} is already taken.`,
    });
  }

  const sameUsernameUser = await User.find({ username });
  if (sameUsernameUser === []) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errrorMessage: `Username : ${username} is already taken.`,
    });
  }

  try {
    const createdUser = User.create({
      email,
      name,
      username,
      password,
      location,
    });

    return res.status(OK_CODE).redirect("/login");
  } catch (error) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errorMessage: `Error : ${error}`,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render(USER_PUG_PATH + "login", {
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
  return res.render(USER_PUG_PATH + "profile", {
    pageTitle: "Username",
  });
};

export const editProfile = (req, res) => {
  return res.end();
};

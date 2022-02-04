import User from "../models/User";
import bcrypt from "bcrypt";

const BASE_PUG_PATH = "../views/";
const USER_PUG_PATH = BASE_PUG_PATH + "users/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;
const CREATED_CODE = 201;

const notUsernameArray = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "/",
  "`",
  "~",
  "?",
  ".",
  ",",
  "'",
  '"',
  "[",
  "]",
  "{",
  "}",
];

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

  // The code below will be replaced by the API
  const sameEmailUser = await User.find({ email });
  if (sameEmailUser !== []) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errorMessage: `Email : ${email} is already taken. Are you the owner of this email? <a href="/login?">If so, log in with this email &rarr;</a>`,
    });
  }

  // The code below will be replaced by the API
  const sameUsernameUser = await User.find({ username });
  if (sameUsernameUser !== []) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errrorMessage: `Username : ${username} is already taken. Are you the owner of this username? <a href="/login?">If so, log in with this username &rarr;</a>`,
    });
  }

  // The code below will be replaced by the API
  let no = false;
  for (let i = 0; i < username.length; i++) {
    const element = username[i];
    if (element in notUsernameArray) {
      no = true;
      break;
    }
  }

  // The code below will be replaced by the API
  if (no) {
    return res.status(BAD_REQUEST_CODE).render(USER_PUG_PATH + "join", {
      pageTitle: "Sign up to Poster",
      errorMessage: `Username  : ${username} is not available.`,
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

    return res.status(CREATED_CODE).redirect("/login");
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

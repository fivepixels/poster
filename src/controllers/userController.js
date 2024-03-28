import User from "../models/User";
import bcrypt from "bcrypt";

const BASE_PUG_PATH = "../views/";
const USER_PUG_PATH = BASE_PUG_PATH + "users/";

import { STATUS_CODE } from "./rootController";

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
  "}"
];

const keywordsArray = ["new", "join", "login", "logout", "search"];

export const getJoin = (_, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(USER_PUG_PATH + "join", {
    pageTitle: "Sign up to Poster"
  });
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, confirmPassword, username, name, location }
  } = req;

  // Check Password
  if (password !== confirmPassword) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(USER_PUG_PATH + "join", {
        pageTitle: "Sign up to Poster",
        errorMessage: `Password does not match.`
      });
  }

  // The code below will be replaced by the API
  // Check Email
  const sameEmailUser = await User.find({ email });
  if (sameEmailUser.length !== 0) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(USER_PUG_PATH + "join", {
        pageTitle: "Sign up to Poster",
        errorMessage: `Email : ${email} is already taken. Are you the owner of this email? <a href="/login?">If so, log in with this email &rarr;</a>`
      });
  }

  // The code below will be replaced by the API
  const sameUsernameUser = await User.find({ username });
  if (sameUsernameUser.length !== 0) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(USER_PUG_PATH + "join", {
        pageTitle: "Sign up to Poster",
        errrorMessage: `Username : ${username} is already taken. Are you the owner of this username? <a href="/login?">If so, log in with this username &rarr;</a>`
      });
  }

  // The code below will be replaced by the API
  let no = false;
  for (let i = 0; i < username.length; i++) {
    const element = username[i];
    if (element in notUsernameArray || element in keywordsArray) {
      no = true;
      break;
    }
  }

  // The code below will be replaced by the API
  if (no) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(USER_PUG_PATH + "join", {
        pageTitle: "Sign up to Poster",
        errorMessage: `Username  : ${username} is not available.`
      });
  }

  try {
    User.create({
      email,
      name,
      username,
      password,
      location
    });

    return res.status(STATUS_CODE.CREATED_CODE).redirect("/login");
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(USER_PUG_PATH + "join", {
        pageTitle: "Sign up to Poster",
        errorMessage: `Error : ${error}`
      });
  }
};

export const getLogin = (_, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(USER_PUG_PATH + "login", {
    pageTitle: "Sign in to Poster"
  });
};

export const postLogin = async (req, res) => {
  const {
    body: { usernameOrEmail, password }
  } = req;

  // The code below will be replaced by the API
  // true = username / false = email
  let type = true;
  for (let i = 0; i < usernameOrEmail.length; i++) {
    const element = usernameOrEmail[i];
    if (element === "@") {
      type = false;
      break;
    }
  }

  let user;

  if (type) {
    user = await User.find({ username: usernameOrEmail });
  } else if (type === false) {
    user = await User.find({ email: usernameOrEmail });
  }

  const samePassword = await bcrypt.compare(password, user[0].password);

  if (!samePassword) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(USER_PUG_PATH + "login", {
        pageTitle: "Sign up to Poster",
        errorMessage: `Password  : "${password}" does not match.`
      });
  }

  req.session.loggedIn = true;
  req.session.loggedInUser = user[0];
  return res.status(STATUS_CODE.OK_CODE).redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const watch = async (req, res) => {
  const {
    params: { username }
  } = req;

  const user = await User.findOne({ username })
    .populate({
      path: "posters",
      populate: {
        path: "topic"
      }
    })
    .populate("topics");

  if (!user) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "404", {
        type: "User"
      });
  }

  return res.status(STATUS_CODE.OK_CODE).render(USER_PUG_PATH + "profile", {
    pageTitle: `Profile | ${user.username}`,
    user
  });
};

export const getEditProfile = (_, res) => {
  return res.render(USER_PUG_PATH + "edit", {
    pageTitle: "Edit Profile"
  });
};

export const postEditProfile = async (req, res) => {
  const {
    session: { loggedInUser },
    body: {
      name,
      username,
      bio,
      email,
      location,
      oldPassword,
      newPassword,
      confirmNewPassword
    },
    file
  } = req;

  const user = await User.findById(loggedInUser._id);

  if (oldPassword !== "" || newPassword !== "" || confirmNewPassword !== "") {
    if (newPassword !== confirmNewPassword) {
      return res
        .status(STATUS_CODE.BAD_REQUEST_CODE)
        .render(USER_PUG_PATH + "edit", {
          pageTitle: "Edit Profile",
          errorMessage: "Password does not match."
        });
    }

    await bcrypt.hash(oldPassword, 5);
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res
        .status(STATUS_CODE.BAD_REQUEST_CODE)
        .render(USER_PUG_PATH + "edit", {
          pageTitle: "Edit Profile",
          errrorMessage: "Old password does not match."
        });
    }
  }

  const sameUsernameUser = await User.findOne({ username });

  if (sameUsernameUser) {
    if (String(sameUsernameUser._id) !== String(loggedInUser._id)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST_CODE)
        .render(USER_PUG_PATH + "edit", {
          pageTitle: "Edit Profile",
          errrorMessage: `Username : ${username} is already taken.`
        });
    }
  }

  const sameEmailUser = await User.findOne({ email });
  if (sameEmailUser) {
    if (String(sameEmailUser._id) !== String(loggedInUser._id)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST_CODE)
        .render(USER_PUG_PATH + "edit", {
          pageTitle: "Edit Profile",
          errorMessage: `Email:  ${email} is already taken.`
        });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, {
    name,
    username,
    bio,
    email,
    avatarUrl: file ? file.path : user.avatarUrl,
    location,
    password: newPassword
      ? await bcrypt.hash(newPassword, 5)
      : loggedInUser.password
  });

  req.session.loggedInUser = updatedUser;

  return res.status(STATUS_CODE.UPDATED_CODE).redirect(`/${username}`);
};

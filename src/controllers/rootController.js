import Poster from "../models/Poster";
import Topic from "../models/Topic";
import User from "../models/User";

const BASE_PUG_PATH = "../views/";

export const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  FOUND_CODE: 302,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND_CODE: 404,
  NOT_ACCEPTABLE_CODE: 405,
  ALEADY_TAKEN_CODE: 409,
};

export const home = async (req, res) => {
  if (!req.session.loggedIn) {
    return res
      .status(STATUS_CODE.OK_CODE)
      .render(BASE_PUG_PATH + "home-not-login", {
        pageTitle: "Login First",
      });
  }

  const {
    session: { loggedInUser },
  } = req;

  const user = User.findById(loggedInUser._id);

  const myPosters = await Poster.find({
    owner: loggedInUser._id,
  }).populate("owner");

  const sugPosters = await Poster.find({}).populate("owner");
  const sugTopics = await Topic.find({}).populate("owner");

  return res.status(STATUS_CODE.OK_CODE).render(BASE_PUG_PATH + "home", {
    pageTitle: "Poster",
    myPosters,
    sugPosters,
    sugTopics,
    user,
  });
};

export const search = async (req, res) => {
  const {
    query: { q },
  } = req;

  const searchRegExp = new RegExp(`${q}`);

  const searchPoster = await Poster.find({ search: searchRegExp })
    .populate("owner")
    .populate("topic");

  const searchTopic = await Topic.find({ search: searchRegExp }).populate(
    "posters"
  );

  const searchUser = await User.find({ search: searchRegExp });

  return res.status(STATUS_CODE.OK_CODE).render(BASE_PUG_PATH + "search", {
    pageTitle: `Search | ${q}`,
    searchPoster,
    searchTopic,
    searchUser,
  });
};

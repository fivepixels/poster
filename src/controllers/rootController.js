import Poster from "../models/Poster";

const BASE_PUG_PATH = "../views/";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;

export const home = (req, res) => {
  return res.render(BASE_PUG_PATH + "home", {
    pageTitle: "Poster",
  });
};

export const getSearch = (req, res) => {
  return res.render(BASE_PUG_PATH + "search.pug", {
    pageTitle: "Search - SearchedKeyword",
  });
};

export const postSearch = (req, res) => {
  return res.end();
};

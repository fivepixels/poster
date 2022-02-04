import Poster from "../models/Poster";

const BASE_PUG_PATH = "../views/";

export const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND_CODE: 404,
  NOT_ACCEPTABLE_CODE: 405,
};

export const home = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(BASE_PUG_PATH + "home", {
    pageTitle: "Poster",
  });
};

export const search = (req, res) => {
  return res.render(BASE_PUG_PATH + "search.pug", {
    pageTitle: "Search - SearchedKeyword",
  });
};

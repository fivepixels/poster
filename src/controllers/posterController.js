import { STATUS_CODE } from "./rootController";

const BASE_PUG_PATH = "../views/";
const POSTER_PUG_PATH = BASE_PUG_PATH + "posters/";

export const randomPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(BASE_PUG_PATH + "random", {
    pageTitle: "Random POSTER : PosterName",
    type: "POSTER",
  });
};

export const watchPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "watch", {
    pageTitle: "Username / PosterName",
  });
};

export const getCreateNewPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "new", {
    pageTitle: "Create a New Poster",
  });
};

export const psotCreateNewPoster = (req, res) => {
  return res.end();
};

export const getEditPoster = (req, res) => {
  return res.status(STATUS_CODE.OK_CODE).render(POSTER_PUG_PATH + "edit", {
    pageTitle: "Username / PosterName",
  });
};

export const postEditPoster = (req, res) => {
  return res.end();
};

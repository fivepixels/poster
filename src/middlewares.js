import multer from "multer";

export const localsMiddleware = async (req, res, next) => {
  const {
    session: { loggedInUser, loggedIn }
  } = req;

  res.locals.siteName = "Poster";
  res.locals.loggedIn = Boolean(loggedIn);
  res.locals.loggedInUser = loggedInUser || {};
  next();
};

export const privateMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const uploadFiles = multer({
  dest: "uploads/avatars/"
});

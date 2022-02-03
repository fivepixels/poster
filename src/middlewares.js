export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Novtube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
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

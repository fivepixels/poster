export const home = (req, res) => {
  return res.render("../views/home");
};

export const getSearch = (req, res) => {
  return res.render("../views/search.pug");
};

export const postSearch = (req, res) => {
  return res.end();
};

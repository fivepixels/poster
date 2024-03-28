import express from "express";
import morgan from "morgan";

import rootRouter from "./routers/rootRouter";
import topicRouter from "./routers/topicRouter";
import randomRouter from "./routers/randomRouter";
import apiRouter from "./routers/apiRouter";

import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800000
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL
    })
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/topics", topicRouter);
app.use("/api", apiRouter);
app.use("/random", randomRouter);
app.use("/", rootRouter);

export default app;

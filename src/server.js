import express from "express";
import morgan from "morgan";

import rootRouter from "./routers/rootRouter";
import topicRouter from "./routers/topicRouter";
import userRotuer from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";

import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/topics", topicRouter);
app.use("/:username", userRotuer);
app.use("/api", apiRouter);

export default app;

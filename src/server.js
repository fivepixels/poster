import express from "express";
import morgan from "morgan";

// Import Routers
import rootRouter from "./routers/rootRouter";
import topicRouter from "./routers/topicRouter";
import userRotuer from "./routers/userRouter";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));

app.use("/", rootRouter);
app.use("/topics", topicRouter);
app.use("/:username", userRotuer);

const handleListening = () => {
  console.log(`✅ Server listening on PORT http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

export default app;

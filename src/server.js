import express from "express";
import morgan from "morgan";
import posterRouter from "./routers/posterRouter";

// Import Routers
import rootRouter from "./routers/rootRouter";
import topicRouter from "./routers/topicRouter";
import userRotuer from "./routers/userRouter";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));

app.use("/", rootRouter);
app.use("/users", userRotuer);
app.use("/posters", posterRouter);
app.use("/topics", topicRouter);

const handleListening = () => {
  console.log(`✅ Server listening on PORT http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

export default app;

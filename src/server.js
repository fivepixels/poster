import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));

const handleListening = () => {
  console.log(`✅ Server listening on PORT http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

export default app;

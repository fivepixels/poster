// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";
import "regenerator-runtime";
import "./db";
import "./models/Poster";
import "./models/Topic";
import "./models/User";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

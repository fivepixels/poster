import express from "express";

const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`✅ Server listening on PORT http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);

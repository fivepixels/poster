import express from "express";
import { editProfile, editTopic } from "../controllers/apiController";
import { uploadFiles } from "../middlewares";

const apiRouter = express.Router();

apiRouter.route("/users/edit").post(uploadFiles.single("avatar"), editProfile);
apiRouter.route("/topic/edit").post(editTopic);

export default apiRouter;

import express from "express";

const apiRouter = express.Router();

apiRouter.post("/star/add/:postername/:username");
apiRouter.post("/star/cancel/:postername/:username");

export default apiRouter;

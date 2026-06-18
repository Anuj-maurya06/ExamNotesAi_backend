import express from "express";
import isAuth from "../middleware/isAuth.js";

import { createCreditOrder } from "../controllers/creditsController.js";

const creditsRouter = express.Router();

creditsRouter.post("/order", isAuth, createCreditOrder);

export default creditsRouter;

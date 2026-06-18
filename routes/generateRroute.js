import express from "express";
import { generateNotes } from "../controllers/generateController.js";
import isAuth from "../middleware/isAuth.js";
import { deleteNote, getMyNotes, getSingleNotes } from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", isAuth, generateNotes);
notesRouter.get("/getnotes", isAuth,getMyNotes)
notesRouter.get("/:id", isAuth , getSingleNotes)
notesRouter.delete("/:id", isAuth, deleteNote)

export default notesRouter;

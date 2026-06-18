import UserModel from "../models/usermodel.js";
import Notes from "../models/notesmodel.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../sevices/gemini.services.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.credits < 1) {
      user.isCreditAvailable = false;
      await user.save();

      return res.status(400).json({
        message: "Insufficient credits",
      });
    }

    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    const airesponse = await generateGeminiResponse(prompt);

    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: airesponse,
    });

    user.credits = Math.max(0, user.credits - 10);

    if (user.credits === 0) {
      user.isCreditAvailable = false;
    }

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);

    await user.save();

    return res.status(200).json({
      data: airesponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI generation failed",
      message: error.message,
    });
  }
};

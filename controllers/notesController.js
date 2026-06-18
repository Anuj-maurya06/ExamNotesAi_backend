import Notes from "../models/notesmodel.js";

// find all notes
export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionmode icludeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "getCurrentUser notes error",
    });
  }
};

// find single note
export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }

    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: `getSingle notes error ${error}`,
    });
  }
};


//delete
export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        error: "Note not found or not authorized",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `delete note error ${error}`,
    });
  }
};

const notesModel = require("../models/note.model");

const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "title & content are required!",
        success: false,
      });
    }

    const note = await notesModel.create({
      title,
      content,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Notes created successfully",
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await notesModel
      .find({ user: req.user._id })
      .populate("user", "email name _id");

    if (!notes) {
      return res.status(400).json({
        message: "Notes not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Notes fetched successfully",
      notes: notes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find note belonging to logged in user
    const note = await notesModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found or unauthorized",
        success: false,
      });
    }

    // Update note
    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();

    return res.status(200).json({
      message: "Note updated successfully",
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const notes = await notesModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notes) {
      return res.status(400).json({
        message: "Notes not found!",
        success: false,
      });
    }

    await notesModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Note deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { createNotes, getAllNotes, updateNotes, deleteNote };

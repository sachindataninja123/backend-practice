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

    const note = await notesModel.create({ title, content });

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
    const notes = await notesModel.find();

    if (!notes) {
      return res.status(400).json({
        message: "Notes not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Notes fetched successfully",
      notes: { notes },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    const notes = await notesModel.findById(req.params.id);

    if (!notes) {
      return res.status(400).json({
        message: "Notes not found!",
        success: false,
      });
    }
    const updatedNote = await notesModel.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );

    return res.status(200).json({
      message: "Notes Updated successfully",
      updatedNote,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deleteNote = async (req, res) => {
  try {
    const notes = await notesModel.findById(req.params.id);

    if (!notes) {
      return res.status(400).json({
        message: "Notes not found!",
        success: false,
      });
    }

    await notesModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "note deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { createNotes, getAllNotes, updateNotes , deleteNote };

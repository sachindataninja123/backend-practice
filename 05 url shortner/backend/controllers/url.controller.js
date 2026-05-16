import { nanoid } from "nanoid";
import urlModel from "../models/url.model.js";

const shortenUrlController = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original url is required",
        success: false,
      });
    }

    const shortUrl = nanoid(6);

    const newUrl = await urlModel.create({
      originalUrl,
      shortUrl,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Short url created successfully",
      shortUrl: `http://localhost:5000/${shortUrl}`,
      data: newUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const redirectUrlController = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const url = await urlModel.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Url not found",
      });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUrlController = async (req, res) => {
  try {
    const url = await urlModel
      .find({ user: req.user._id })
      .populate("user", "name email _id");

    if (!url) {
      return res.status(404).json({
        message: "Url not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Url fetched successfully",
      success: true,
      url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUrlController = async (req, res) => {
  try {
    const { id } = req.params;
    const { originalUrl } = req.body;

    const url = await urlModel.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    url.originalUrl = originalUrl || url.originalUrl;

    await url.save();

    res.status(200).json({
      success: true,
      message: "URL updated successfully",
      data: url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUrlController = async (req, res) => {
  try {
    const url = await urlModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!url) {
      return res.status(404).json({
        message: "Url not found!",
        success: false,
      });
    }

    await urlModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Url deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  shortenUrlController,
  redirectUrlController,
  getUrlController,
  updateUrlController,
  deleteUrlController,
};

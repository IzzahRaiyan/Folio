const mongoose = require("mongoose");
const Entry = require("../models/Entry");

async function createEntry(req, res, next) {
  try {
    const { title, category, description, tags = [] } = req.body;

    const entry = await Entry.create({
      title,
      category,
      description,
      tags,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Journal entry created successfully.",
      entry,
    });
  } catch (error) {
    next(error);
  }
}

async function getEntries(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { category } = req.query;

    const filter = { userId: req.user.id };

    if (category) {
      filter.category = category;
    }

    const [entries, total] = await Promise.all([
      Entry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Entry.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getEntryById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entry ID.",
      });
    }

    const entry = await Entry.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      entry,
    });
  } catch (error) {
    next(error);
  }
}

async function updateEntry(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entry ID.",
      });
    }

    const allowedFields = ["title", "category", "description", "tags"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update.",
      });
    }

    const entry = await Entry.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Journal entry updated successfully.",
      entry,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteEntry(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entry ID.",
      });
    }

    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Journal entry deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
};
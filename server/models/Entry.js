
const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minlength: [1, "Title cannot be empty."],
      maxlength: [120, "Title cannot exceed 120 characters."],
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["Book", "Film & Series", "Place", "Skill", "Reflection"],
    },

    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [1, "Description cannot be empty."],
      maxlength: [5000, "Description cannot exceed 5000 characters."],
    },

    tags: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [30, "Each tag cannot exceed 30 characters."],
        },
      ],
      default: [],
      validate: {
        validator: (tags) => tags.length <= 10,
        message: "You can add up to 10 tags.",
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);

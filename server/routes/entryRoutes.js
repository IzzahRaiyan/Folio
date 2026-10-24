const express = require("express");
const { z } = require("zod");

const requireAuth = require("../middleware/auth");

const {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} = require("../controllers/entryController");

const router = express.Router();

const categories = [
  "Book",
  "Film & Series",
  "Place",
  "Skill",
  "Reflection",
];

const entrySchema = z.object({
  title: z.string().trim().min(1).max(120),
  category: z.enum(categories),
  description: z.string().trim().min(1).max(5000),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).optional(),
}).strict();

const updateSchema = entrySchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Provide at least one field to update." }
).strict();

function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please check the entry information.",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
}

function validateListQuery(req, res, next) {
  const querySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
    category: z.enum(categories).optional(),
  }).strict();

  const result = querySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid list filters.",
    });
  }

  req.query.page = String(result.data.page);
  req.query.limit = String(result.data.limit);
  req.query.category = result.data.category;

  next();
}

function validateId(req, res, next) {
  const result = z.string().regex(/^[a-f\d]{24}$/i).safeParse(req.params.id);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid entry ID.",
    });
  }

  next();
}

router.use(requireAuth);

router.post("/", validateBody(entrySchema), createEntry);
router.get("/", validateListQuery, getEntries);
router.get("/:id", validateId, getEntryById);
router.put("/:id", validateId, validateBody(updateSchema), updateEntry);
router.delete("/:id", validateId, deleteEntry);

module.exports = router;
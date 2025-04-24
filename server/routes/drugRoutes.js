// server/routes/drugRoutes.js
const express = require("express");
const router = express.Router();
const Drug = require("../models/Drug");
const authMiddleware = require("../middleware/auth");
const {
  AddDrug,
  fetchDrugs,
  deleteDrug,
  updateDrug,
} = require("../controllers/drugController");

router.post("/addDrug", authMiddleware, AddDrug);
router.get("/all", authMiddleware, fetchDrugs);
router.delete("/:id", authMiddleware, deleteDrug);
router.put("/:id", authMiddleware, updateDrug);

module.exports = router;

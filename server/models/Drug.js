// server/models/Drug.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  batchNumber: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  composition: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["manufactured", "distributed", "dispensed", "consumed"],
    default: "manufactured",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  drugId: {
    type: String,
    default: uuidv4,
  },
  history: [
    {
      status: String,
      date: Date,
      location: String,
      handledBy: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Drug", drugSchema);

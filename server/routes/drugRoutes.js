// server/routes/drugRoutes.js
const express = require('express');
const router = express.Router();
const Drug = require('../models/Drug');
const authMiddleware = require('../middleware/auth');

// Get all drugs
router.get('/', authMiddleware, async (req, res) => {
  try {
    const drugs = await Drug.find().sort({ createdAt: -1 });
    res.json(drugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new drug
router.post('/', authMiddleware, async (req, res) => {
  try {
    const drug = new Drug(req.body);
    await drug.save();
    res.status(201).json(drug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a drug
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const drug = await Drug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!drug) return res.status(404).json({ error: 'Drug not found' });
    res.json(drug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a drug
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const drug = await Drug.findByIdAndDelete(req.params.id);
    if (!drug) return res.status(404).json({ error: 'Drug not found' });
    res.json({ message: 'Drug deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update drug status (tracking)
router.post('/:id/track', authMiddleware, async (req, res) => {
  try {
    const { status, location, handledBy } = req.body;
    const drug = await Drug.findById(req.params.id);
    
    if (!drug) return res.status(404).json({ error: 'Drug not found' });
    
    drug.status = status;
    drug.history.push({
      status,
      date: new Date(),
      location,
      handledBy
    });
    
    await drug.save();
    res.json(drug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get drug by QR code (batch number)
router.get('/batch/:batchNumber', authMiddleware, async (req, res) => {
  try {
    const drug = await Drug.findOne({ batchNumber: req.params.batchNumber });
    if (!drug) return res.status(404).json({ error: 'Drug not found' });
    res.json(drug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
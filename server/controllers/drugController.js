// server/controllers/drugController.js
const Drug = require('../models/Drug');
const User = require('../models/User');
const QRCode = require('qrcode');

exports.getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find().sort({ createdAt: -1 });
    res.status(200).json(drugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDrug = async (req, res) => {
  try {
    const drug = new Drug(req.body);
    await drug.save();
    
    // Add initial history entry
    drug.history.push({
      status: 'manufactured',
      date: new Date(),
      location: drug.manufacturer,
      handledBy: req.user.name || 'System'
    });
    
    await drug.save();
    res.status(201).json(drug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDrug = async (req, res) => {
  try {
    const drug = await Drug.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    
    res.status(200).json(drug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDrug = async (req, res) => {
  try {
    const drug = await Drug.findByIdAndDelete(req.params.id);
    
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    
    res.status(200).json({ message: 'Drug deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.trackDrug = async (req, res) => {
  try {
    const { status, location, handledBy } = req.body;
    const drug = await Drug.findById(req.params.id);
    
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    
    drug.status = status;
    drug.history.push({
      status,
      date: new Date(),
      location,
      handledBy: handledBy || req.user.name || 'Unknown'
    });
    
    await drug.save();
    res.status(200).json(drug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDrugByBatch = async (req, res) => {
  try {
    const drug = await Drug.findOne({ batchNumber: req.params.batchNumber });
    
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    
    res.status(200).json(drug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateDrugQR = async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    
    const qrData = {
      id: drug._id,
      name: drug.name,
      batchNumber: drug.batchNumber,
      system: 'DrugTrace'
    };
    
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    res.status(200).json({ qrCode, drug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
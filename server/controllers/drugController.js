const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const Drug = require("../models/Drug");

const AddDrug = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Acess Denied",
    });
  }

  console.log(req.user);

  try {
    const {
      name,
      batchNumber,
      manufacturer,
      manufactureDate,
      expiryDate,
      composition,
      dosage,
    } = req.body;

    const drugId = uuidv4();

    const qrData = {
      drugId,
      name,
      batchNumber,
      manufacturer,
      manufactureDate,
      expiryDate,
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    const newDrug = await Drug.create({
      name,
      batchNumber,
      manufacturer,
      manufactureDate,
      expiryDate,
      composition,
      qrCode,
      createdBy: req.user.userId,
      dosage,
    });

    res.json({
      success: true,
      message: "Drug Created Successfully",
      Drug: newDrug,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some internal Error Occurred",
    });
  }
};

const fetchDrugs = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Acess Denied",
    });
  }
  const userId = req.user.userId;
  const Drugs = await Drug.find({ createdBy: userId });

  res.json({
    success: true,
    message: "Fetched Drugs",
    Drugs,
  });
};

const deleteDrug = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Acess Denied",
    });
  }
  const id = req.params.id;
  await Drug.deleteOne({ _id: id });

  res.json({
    success: true,
    message: "Drug Deleted",
  });
};

const updateDrug = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access Denied",
    });
  }

  try {
    const { id } = req.params;
    const {
      name,
      batchNumber,
      manufacturer,
      manufactureDate,
      expiryDate,
      composition,
      dosage,
      status,
    } = req.body;

    // Find the existing drug
    const existingDrug = await Drug.findById(id);
    if (!existingDrug) {
      return res.status(404).json({
        success: false,
        message: "Drug not found",
      });
    }

    // Verify the drug belongs to the requesting user
    if (existingDrug.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update drugs you created",
      });
    }

    // Prepare update data
    const updateData = {
      name,
      batchNumber,
      manufacturer,
      manufactureDate,
      expiryDate,
      composition,
      dosage,
    };

    // Handle status change if provided
    if (status && status !== existingDrug.status) {
      updateData.status = status;
      updateData.$push = {
        history: {
          status: status,
          changedAt: new Date(),
          changedBy: req.user.userId,
        },
      };
    }

    // Update the drug
    const updatedDrug = await Drug.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // Regenerate QR code if any critical fields changed
    if (
      name !== existingDrug.name ||
      batchNumber !== existingDrug.batchNumber ||
      manufacturer !== existingDrug.manufacturer ||
      manufactureDate !== existingDrug.manufactureDate ||
      expiryDate !== existingDrug.expiryDate
    ) {
      const qrData = {
        drugId: existingDrug._id,
        name,
        batchNumber,
        manufacturer,
        manufactureDate,
        expiryDate,
      };

      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
      updatedDrug.qrCode = qrCode;
      await updatedDrug.save();
    }

    res.json({
      success: true,
      message: "Drug updated successfully",
      Drug: updatedDrug,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { AddDrug, fetchDrugs, deleteDrug, updateDrug };

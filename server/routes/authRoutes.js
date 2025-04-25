const express = require("express");
const { SignUp, SignIn, checkRole } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "All Ok!",
  });
});

router.post("/signup", SignUp);

router.post("/signin", SignIn);

router.get("/checkRole", authMiddleware);

module.exports = router;

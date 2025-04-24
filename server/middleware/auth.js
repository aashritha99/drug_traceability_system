const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await jwt.verify(token, "satyam215");

    // Check for admin custom claim
    if (decodedToken.role === "admin") {
      req.user = {
        isAdmin: true,
        userId: decodedToken._id,
      };
      next(); // Allow admin to proceed
      return;
    }

    if (decodedToken.role === "user") {
      req.user = {
        isAdmin: false,
        userId: decodedToken._id,
      };
      next();
      return;
    }
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authMiddleware;

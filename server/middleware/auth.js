const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "satyam215");
    console.log(true);
    console.log(decodedToken);

    // Check for admin custom claim
    if (decodedToken.role === "admin") {
      req.user = {
        isAdmin: true,
        userId: decodedToken.UserId,
      };
      next(); // Allow admin to proceed
      return;
    }

    if (decodedToken.role === "user") {
      req.user = {
        isAdmin: false,
        userId: decodedToken.UserId,
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

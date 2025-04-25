const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SignUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json({
        success: false,
        message: "User already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      [
        {
          name,
          email,
          role: role || "user",
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      user: {
        UserId: user[0]._id,
        name: user[0].name,
        email: user[0].email,
      },
      message: "Sign Up Successful",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const findUser = await User.findOne({ email });
    if (!findUser) {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json({
        success: false,
        message: "Please Signup First",
      });
    }

    if (!(await bcrypt.compare(password, findUser.password))) {
      await session.abortTransaction();
      session.endSession();

      res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    console.log(findUser._id);

    const token = jwt.sign(
      { UserId: findUser._id, role: findUser.role },
      "satyam215"
    );

    res.status(200).json({
      success: true,
      isAdmin: findUser.role === "user" ? false : true,
      name: findUser.name,
      message: "User Signed In successfully",
      token: `Bearer ${token}`,
    });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

const checkRole = (req, res) => {
  const userDetails = req.user;
  if (userDetails.isAdmin) {
    res.json({
      message: "Admin",
    });
  }

  if (!userDetails.isAdmin) {
    res.json({
      message: "User",
    });
  }
};

module.exports = { SignUp, SignIn, checkRole };

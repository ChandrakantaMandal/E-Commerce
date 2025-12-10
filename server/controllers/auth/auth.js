import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/User.js";

//register user
const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User alrady exists with same email!! Please try again",
      });

    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registeration successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not created",
    });
  }
};

//login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
        },
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not Logged in",
    });
  }
};

//logout
const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

export { register, login, logout, authMiddleware };

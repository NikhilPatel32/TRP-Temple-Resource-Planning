const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register handler
const registerUser = async (req, res) => {
  try {
    //extract user details
    const { username, email, phone, role, password } = req.body;

    console.log("Incoming Registration Request:", req.body); // Log request data

    //check if username or email exists
    const isUserExistAlready = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExistAlready) {
      return res.status(201).json({
        success: false,
        message:
          "username or email already exits. Try with differnt credentials",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //store in database
    const newUser = new User({
      username,
      email,
      phone,
      role: role || "user",
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      res.status(200).json({
        success: true,
        message: "User registered succesfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register. Please try again",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Oops! something went wrong. Please try again",
    });
  }
};


//login handler
const loginUser = async (req, res) => {
  try {

    console.log("Received login request:", req.body); //debugging
    const { username, email , password } = req.body;

    //find if the current user exist in databse or not
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    //checking password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", passwordMatch);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    console.log('token making finished' , accessToken); //debug
    res.status(200).json({
      success: true,
      message: "LoggedIn successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Oops! something went wrong. Please try again",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

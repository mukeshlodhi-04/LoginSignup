const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const msg = "user not found pls sign in ";
    if (!user) {
      return res.status(400).json({ message: msg, success: false });
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      res.status(403).json({ message: "wrong password", success: false });
    }

    const token = jwt.sign({
        email: user.email,
        _id : user._id
    },process.env.JWT_SECRET_KEY,
    {expiresIn:'24h'}
    )

    res.status(201).json({ message: "login successfull", success: true ,token,name:user.name,email});
  } catch (error) {
    res.status(500).json({ message: "user not found", success: true });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user exists", success: false });
    }
    const newuser = new User({ name, email, password });
    newuser.password = await bcrypt.hash(password, 10);
    await newuser.save();
    res.status(201).json({ message: "user created", success: true });
  } catch (error) {
    res.status(500).json({ message: "fill all the feild ", success: false });
  }
};

module.exports = { login, signup };

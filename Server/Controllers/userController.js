const User = require("../Model/userModel");
const bcrypt = require("bcrypt");

// Register...
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck) {
      return res.json({ msg: "Username Already Exist", status: false });
    }
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.json({ msg: "Email Already Exist", status: false });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPass,
    });
    delete user._doc.password;
    return res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usercheck = await User.findOne({ username: username });
    if (!usercheck) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const passcheck = await bcrypt.compare(password, usercheck.password);
    if (!passcheck) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    delete usercheck._doc.password;
    return res.json({ status: true, usercheck });
  } catch (e) {
    next(e);
  }
};

//setAvatar...
const setAvatar = async (req, res, next) => {
  try {
    const userid = req.params.id;
    const avatarImage = req.body.image;
    const userdata = await User.findByIdAndUpdate(userid , {
      isAvatarImageSet:true,
      avatarImage,
    })
    return res.json({
      isSet: userdata.isAvatarImageSet,
      image: userdata.avatarImage,
    });

  } catch (e) {
    next(e);
  }
};

//getAllUsers...
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  setAvatar,
  getAllUsers
};

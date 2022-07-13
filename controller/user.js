const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const User = require("../models/User");
const Files = require("../models/Files");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Inavlid Credentials" });
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    user.password = undefined;
    //generating jwt Token
    const token = jwt.sign(payload, "jwt-token", {
      expiresIn: 7200,
    });
    // res.cookie("token", token, { expiresIn: 7200 });
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.uploadFile = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json(err);
      }
      try {
        const fileToUpload = new Files(fields);
        fileToUpload.file.data = fs.readFileSync(files.file.filepath);
        fileToUpload.file.contentType = files.file.type;

        await fileToUpload.save();
        return res.status(200).json({ message: "uploaded" });
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

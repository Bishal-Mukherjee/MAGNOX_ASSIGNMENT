const express = require("express");
const router = express.Router();
const { register, login, uploadFile } = require("../controller/user");

// register user
// api/user/register
router.post("/register", register);

// register user
// api/user/login
router.post("/login", login);

// file upload
// api/user/upload
router.post("/upload", uploadFile);

module.exports = router;

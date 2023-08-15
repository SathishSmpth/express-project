var express = require("express");
var router = express.Router();

const { signUp, login } = require("../controller/auth");

router.route("/").get();
router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router;

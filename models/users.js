const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid mail id"],
  },

  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    minlength: 4,
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    minlength: 4,
  },
  photo: String,
  phone: {
    type: "number",
    min: 1000000000, //10-digit validation
    max: 9999999999, //10-digit validation
  },
  dob: String,
  password: {
    type: String,
    required: [true, "Please enter your password"],
    validate: {
      validator: function (pwd) {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return regex.test(pwd);
      },
    },
    message: "Confirm password  doesn't match with password",
  },

  confirmPassword: {
    type: String,
    required: [true, "Please enter your confirm password"],
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      },
    },
    message: "Confirm password  doesn't match with password",
  },
});

UserSchema.pre("save", async function (next) {
  // Only run password if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("users", UserSchema);

module.exports = User;

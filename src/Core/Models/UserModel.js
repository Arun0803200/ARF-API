const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
  constructor({
    id = null,
    mobileNumber = null,
    mobileNumberForSearch = null,
    fullName = null,
    fullNameForSearch = null,
    fullNameNativeLang = null,
    address = null,
    dob = null,
    gender = null,
    aadharNumber = null,
    aadharNumberForSearch = null,
    panNumber = null,
    panNumberForSearch = null,
    role = null,
    createdAt = null,
    updatedAt = null,
    passwordHash = null,
  }) {
    this.id = id;

    this.mobileNumber = mobileNumber;
    this.mobileNumberForSearch = mobileNumberForSearch;

    this.fullName = fullName;
    this.fullNameForSearch = fullNameForSearch;
    this.fullNameNativeLang = fullNameNativeLang;

    this.address = address;
    this.dob = dob;
    this.gender = gender;

    this.aadharNumber = aadharNumber;
    this.aadharNumberForSearch = aadharNumberForSearch;

    this.panNumber = panNumber;
    this.panNumberForSearch = panNumberForSearch;

    this.role = role;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.passwordHash = passwordHash;
  }

  // Hash password
  async bcryptHashing(text) {
    return await bcrypt.hash(text, 10);
  }

  // Compare password
  async bcryptCompare(text, hashedText) {
    return await bcrypt.compare(text, hashedText);
  }

  async createAccessToken(userId, role) {
    const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES + process.env.ACCESS_TOKEN_EXPIRES_TYPE,
    });
    return accessToken;
  }

  async createRefreshToken(userId, role) {
    const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_TOKEN, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES + process.env.REFRESH_TOKEN_EXPIRES_TYPES,
    });
    return refreshToken;
  }
}

module.exports = { User };

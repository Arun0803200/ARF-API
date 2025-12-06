class User {
  constructor({
    id = null,
    mobileNumber = null,
    mobileNumberForSearch = null,
    fullName = null,
    fullNameForSearch = null,
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
  }) {
    this.id = id;

    this.mobileNumber = mobileNumber;
    this.mobileNumberForSearch = mobileNumberForSearch;

    this.fullName = fullName;
    this.fullNameForSearch = fullNameForSearch;

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
  }
}

module.exports = {User};

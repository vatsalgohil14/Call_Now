const crypto = require("crypto");

class HashService {
  hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET) // used for hashing method hai ye sha26 is the algo for hashing
      .update(data) // data to hash
      .digest("hex"); // hex format mai hash milega
  }
}

module.exports = new HashService();

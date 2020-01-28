const bcrypt = require('bcrypt');

class Hash {
  static generate(pass) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pass, salt);

    return hash;
  }

  static verify(pass, hash) {
    return bcrypt.compareSync(pass, hash);
  }
}

module.exports = Hash;

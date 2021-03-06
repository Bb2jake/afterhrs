let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Models = require('../config/constants').models
let bcrypt = require('bcryptjs')
const SALT_FACTOR = 10

let schema = new Schema({
  username: { type: String, required: true, unique: true, dropDups: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  continentalState: { type: String, required: true },
  zipCode: { type: String, required: true },
  username: { type: String, required: true },
  agreement: { type: Boolean, required: true },
  foundingMember: { type: Boolean, required: true, default: false },
  conversations: { type: Object, default: {} },
  friends: { type: Array, default: [] },
  parties: { type: Array, default: [] },
  bars: { type: Array, default: [] },
  liquorStores: { type: Array, default: [] },
  drinks: { type: Array, default: [] },
  isDrinking: { type: Object, default: {} },
  status: { type: String, default: '' },
  drunkLevel: { type: Number, default: 0 },
  preferences: { type: Object, default: {} },
  activityFeed: { type: Array, default: [] },
  requests: { type: [ObjectId], ref: Models.user.name, default: [] }
})


schema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    }
  });
});

schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  })
};

module.exports = mongoose.model('User', schema)
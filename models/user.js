const mongoose = require('mongoose');

const PersonSchema = require('./schemes/person');

const { Schema } = mongoose;

const userSchema = new Schema({
  person: PersonSchema,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  lastSessionId: {
    type: String,
    required: false,
  },
  sCookiesHacked: {
    type: Boolean,
    required: false,
    default: false,
  },
}, {
  timestamps: true,
});


const getFormatedDate = (date, isShowTime = false) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  let formatedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  if (isShowTime) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    formatedDate = `${formatedDate} at ${hours}:${minutes}`;
  }
  return formatedDate;
};


userSchema.virtual('fullName').get(function () {
  return `${this.person.name} ${this.person.surname}`;
});


userSchema.virtual('age').get(function () {
  if (this.person.birthday) {
    const today = new Date();
    const month = today.getMonth() - this.person.birthday.getMonth();

    let age = today.getFullYear() - this.person.birthday.getFullYear();

    if (month < 0 || (month === 0 && today.getDate() < this.birthday.getDate())) {
      age--;
    }

    return age;
  }

  return null;
});


userSchema.methods.getBirthday = function () {
  if (this.person.birthday) {
    return getFormatedDate(this.person.birthday);
  }
  return null;
};

userSchema.methods.getRegisteredDate = function () {
  return getFormatedDate(this.createdAt, true);
};

userSchema.methods.getEditableBirthday = function () {
  if (this.person.birthday) {
    let day = this.person.birthday.getDate();
    let month = this.person.birthday.getMonth() + 1;

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    return `${this.person.birthday.getFullYear()}-${month}-${day}`;
  }

  return null;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

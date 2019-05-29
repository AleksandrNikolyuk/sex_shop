const Country = require('models/country');
const User = require('models/user');
const createError = require('http-errors');
const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const config = require('config');
const ProfileJsonSchema = require('schemes/profile');
const PasswordJsonSchema = require('schemes/password');
const LoginJsonSchema = require('schemes/login');

const registerView = async (req, res) => {
  const countries = await Country.find({}).sort({ name: 1 });

  res.render('register', { title: 'Register page', countries, data: {}, error: false });
};

const registerAction = async (req, res) => {
  const { name, surname, email, countryId, phone, birthday, password, passwordRetype } = req.body;

  const personObj = {
    name,
    surname,
    email,
    countryId,
    phone,
    birthday,
  };

  const passwordObj = {
    password,
    passwordRetype,
  };

  const countries = await Country.find({}).sort({ name: 1 });

  try {
    let ajv = new Ajv({ verbose: true });
    const validProfile = ajv.validate(ProfileJsonSchema, personObj);

    if (!validProfile) {
      const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
      throw new Error(message);
    }

    ajv = new Ajv({ verbose: true, $data: true });

    const validPassword = ajv.validate(PasswordJsonSchema, passwordObj);

    if (!validPassword) {
      const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
      throw new Error(message);
    }

    const emailUser = await User.findOne({ 'person.email': email });

    if (emailUser) {
      throw new Error('A user with this E-mail already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const birthdayDate = birthday.length ? new Date(birthday) : null;

    const newUser = new User({
      person: {
        name,
        surname,
        email,
        phone,
        birthday: birthdayDate,
        password: passwordHash,
      },
      role: 'user',
    });

    if (countryId.length) {
      newUser.person.country = countryId;
    }

    const user = await newUser.save();

    res.render('success', { title: 'Registration Сompleted', user });
  } catch (error) {
    res.render('register', { title: 'Register page', countries, data: personObj, error: error.message });
  }
};

const loginView = async (req, res) => {
  res.render('login', { title: 'Register page', data: {}, error: false });
};

const loginAction = async (req, res) => {
  const { email, password } = req.body;

  const loginObj = {
    email,
    password,
  };

  try {
    const ajv = new Ajv({ verbose: true });

    const validLogin = ajv.validate(LoginJsonSchema, loginObj);

    if (!validLogin) {
      const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
      throw new Error(message);
    }

    const user = await User.findOne({ 'person.email': email });

    if (!user) {
      throw new Error('User with such E-mail was not found');
    }

    const comparePassword = await bcrypt.compare(password, user.person.password);

    if (!comparePassword) {
      throw new Error('Wrong password');
    }

    req.session.userId = user.id;

    user.lastSessionId = req.sessionID;
    await user.save();

    res.redirect('/dashboard');
    // res.redirect('/home');
  } catch (error) {
    res.render('login', { title: 'Register page', data: loginObj, error: error.message });
  }
};

const getUserFromDatabaseBySessionUserId = async (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    const user = await User.findById(userId).populate('person.country');
    if (user) {
      res.locals.user = user;
    } else {
      return res.redirect('/logout');
    }
  }
  next();
};


const logout = (req, res) => {
  req.session.destroy(async (err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie(config.get('session:name'));
    res.redirect('/login');
  });
};

module.exports.registerView = registerView;
module.exports.registerAction = registerAction;
module.exports.loginView = loginView;
module.exports.loginAction = loginAction;
module.exports.getUserFromDatabaseBySessionUserId = getUserFromDatabaseBySessionUserId;
module.exports.logout = logout;

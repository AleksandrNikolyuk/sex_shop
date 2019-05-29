const i18n = require('i18n');

const Category = require('models/category');


const dashboardView = async (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
};

const categoryView = async (req, res) => {
  const categories = await Category.find({}).sort({ name: 1 });
  res.render('category', {
    title: 'Categories', categories, data: {}, error: false });
};

const homeView = async (req, res) => {
  res.render('home', { title: 'Hello user', locales: i18n.getLocales() });
};

const homeViewLang = async (req, res) => {
  i18n.setLocale(req, req.params.lang);
  res.render('home', { title: 'Hello', locales: i18n.getLocales() });
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  const objCategory = {
    name,
  };

  try {
    if (typeof (name) !== 'string') {
      throw new Error('The data is not a string');
    }

    const caregory = await Category.findOne({ name });
    if (caregory) {
      throw new Error('This category already exists');
    }

    const newCategory = new Category(objCategory);
    await newCategory.save();

    res.render('category', {
      title: 'Categories', data: objCategory, error: false, success: true,
    });
  } catch (error) {
    res.render('category', {
      title: 'Categories', data: objCategory, error: error.message, success: false,
    });
  }
};

module.exports.dashboardView = dashboardView;
module.exports.homeView = homeView;
module.exports.homeViewLang = homeViewLang;
module.exports.categoryView = categoryView;
module.exports.addCategory = addCategory;

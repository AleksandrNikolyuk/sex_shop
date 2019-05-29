const express = require('express');

const router = express.Router();
const pagesController = require('controllers/pages');
const authController = require('controllers/auth');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', pagesController.homeView);
router.get('/home/:lang', pagesController.homeViewLang);

router.get('/dashboard', pagesController.dashboardView);

router.get('/login', authController.loginView);
router.post('/login', authController.loginAction);

router.get('/register', authController.registerView);
router.post('/register', authController.registerAction);

router.get('/category', pagesController.categoryView);
router.post('/category', pagesController.addCategory);

router.get('/logout', authController.logout);

module.exports = router;

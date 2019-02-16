var express = require('express');
var router = express.Router();
const { checkAuth } = require('../middlewares/auth')

/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
  const user = req.session.user
  res.render('index', { title: 'Bootcamp App', user: user });
});

module.exports = router;

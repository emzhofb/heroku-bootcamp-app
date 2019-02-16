var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  models.User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user != null) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword === true) {
        req.session.user = {
          username: user.username
        }
        res.redirect('/')
      } else {
        res.redirect('/users/login')
      }
    } else {
      res.redirect('/users/login')
    }
  }).catch(err => {
    console.log(err)
    res.redirect('/users/login')
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/users/login')
    }
  })
})

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/register', (req, res) => {
  let { name, username, password } = req.body
  password = bcrypt.hashSync(password, 10)
  models.User.create({name, username, password}).then(user => {
    res.redirect('/users/login')
  }).catch(err => {
    console.log(err)
    res.redirect('/users/register')
  })
})

module.exports = router;

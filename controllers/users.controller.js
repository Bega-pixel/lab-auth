const mongoose = require('mongoose');
const httpError = require('http-errors');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  res.render('users/register');
};

module.exports.doRegister = (req, res, next) => {

  function renderWithErrors(errors) {
    res.status(400).render('users/register', {
      user: req.body,
      errors: errors,
    });
  }

  // Iteration 1: register and validate user
};

module.exports.login = (req, res, next) => {
  res.render('users/login');
};

module.exports.doLogin = (req, res, next) => {
  // Iteration 2: login user

    User.findOne({ email: req.body.email  })
      .then((user) => {
        if (user) {
          user.checkPassword(req.body.password).then((match) => {
            if (match) {
              req.session.currentUserId = user.id;           
               res.redirect('/');
            } else {
              res.render('users/login', { user: req.body, errors: { password: 'invalid user' } });
            }
          });
        } else {
          res.render('users/login', { user: req.body, errors: { email: 'user not found' } });
        }
      })
      .catch(next);
  

  // Iteration 4: clean this method and login the user with passport
};

module.exports.logout = (req, res, next) => {
  // Iteration 2: logout

  req.session.destroy();
  res.redirect('/login');

};

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.render('users/list', { users }))
    .catch(next)
}


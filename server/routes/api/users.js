const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Role = require('../../models/role');
const config = require('../../config/config');

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 * Ref: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then( user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists"});
    }

    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      role: Role.User
    });

    // Hash password before saving
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
               .then(user => res.json(user))
               .catch(err => console.log(`err: ${err}`));
      });
    });
  });
});

/**
 * @route POST api/users/login
 * @desc Login user and return JWT Token
 * @access Public
 */
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(IsMatch => {
      if (IsMatch) {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        };

        //Sign Token
        jwt.sign(
          payload,
          config.SECRET_JUICE,
          {
            expiresIn: 172800
          },
          (err, token) => {
            res.json({
              success: true,
              token: token
            });
          }
        );
      } else {
        return res.status(400).json({ userOrPasswordIncorrect: "Email or Password is incorrect"});
      }
    })
  });
});

module.exports = router;

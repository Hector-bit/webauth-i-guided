const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/hash', (req, res) => {
  // read a password from the body
  req.body
  // hash the password using bcryptjs
  // return it to the user in an object that looks like
  // { password: 'original passsword', hash: 'hashed password' }
})

router.post('/register', (req, res) => {
  let user = req.body;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


module.exports = router;

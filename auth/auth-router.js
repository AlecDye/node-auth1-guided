const router = require("express").Router();
// hashing securities
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken"); // -> npm i jsonwebtoken

const Users = require("../users/users-model");

// account login
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  // search for the user using the username
  Users.findBy({ username })
    .then(([user]) => {
      // if we find the user, then also check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token
        const token = generateToken(user);
        // send token to the client
        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "You cannot pass!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

// token
function generateToken(user) {
  const payload = {
    // the data
    userId: user.id,
    username: user.username,
  };
  // moved secret to its own file
  // const secret = process.env.JWT_SECRET || "keept it secret, keep it safe!";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;

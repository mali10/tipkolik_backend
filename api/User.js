const express = require("express");
const router = express.Router();

// mongodb user model
const User = require("./../models/User");

// Password handler
const bcrypt = require("bcrypt");

// Endpoint to check if a player exists by name
router.post('/check-player', async (req, res) => {
  try {
      const { playerName } = req.body;
      
      // Trim and validate the playerName to ensure it's a non-empty string
      if (typeof playerName !== 'string' || playerName.trim().length === 0) {
          return res.status(400).json({
              status: 'FAILED',
              message: 'Player name is required and must be a valid string.'
          });
      }

      const user = await User.findOne({ name: playerName.trim() });
      const exists = !!user; // Coerce the user object to a boolean to indicate existence

      res.status(200).json({
          status: 'SUCCESS',
          exists,
          message: exists ? 'Player found.' : 'Player does not exist.'
      });
  } catch (error) {
      console.error(`Error checking player existence for name ${req.body.playerName}:`, error);
      res.status(500).json({
          status: 'FAILED',
          message: 'Error checking player existence',
          error: error.message
      });
  }
});

// Signup
router.post("/signup", (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name == "" || email == "" || password == "" || dateOfBirth == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "FAILED",
      message: "Invalid date of birth entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  } else {
    // Checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // A user already exists
          res.json({
            status: "FAILED",
            message: "User with the provided email already exists",
          });
        } else {
          // Try to create new user

          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
                tournaments: [],
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Signup successful",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An error occurred while saving user account!",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while hashing password!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user!",
        });
      });
  }
});

// Signin
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }
});

module.exports = router;
const express = require('express');
require('../db/conn');
const router = express.Router();
const User = require('../model/userSchema');
//Here we are not using ES6 version of importing or exporting things.
const { hashPassword, comparePassword } = require('../helper/authHelper');

router.get('/', (req, res) => {
   res.send(`Hello from router.js`);
})


//Router for Registration of a new User

router.post('/register', (req, res) => {
   console.log(req.body);

   //Save data to database

   const { name, email, phone, work, password } = req.body;
   //Check if either of the param is empty or not
   if (!name || !email || !phone || !work || !password) {
      return res.status(422).json({ error: "Plz fill the details carefully" });
   }
   //Now check if the user signing up is unique or not
   User.findOne({ email: email }).then((userExist) => {
      if (userExist) {
         return res.status(422).json({ error: "User already exists" });
      }

      //Now hash the password
      hashPassword(password).then((hashedPassword) => {
         console.log(hashedPassword);
         //When key value pair is of same name then we don't write them again and again.
         const user = new User({ name, email, phone, work, password: hashedPassword });
         //save it in the database(database errors starts from 500)
         user.save().then(() => {
            return res.status(201).json({ message: "Data successfuly stored in the database" });
         }).catch((err) => {
            return res.status(500).json({ message: "Registration Failed" });
         })
      }).catch((err) => {
         console.log(err);

      })

   }).catch((err) => {
      console.log(err);
   })
   console.log(req.body);

})


//Router for Login Credentials

router.post('/login', (req, res) => {

   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the credentiala" });
   }
   User.findOne({ email: email }).then((userExist) => {
      if (!userExist) {
         return res.status(404).json({ message: 'Invalid Credentials' });
      }
      console.log(userExist);
      
      comparePassword(password, userExist.password).then((match) => {
         if (!match) {
            return res.status(404).json({ message: 'Invalid Credentials' })
         }
         return res.status(201).json({message:"Successfully Logged In"});
      })
   })
})

module.exports = router;
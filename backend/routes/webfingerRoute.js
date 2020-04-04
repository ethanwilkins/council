const express = require('express');
const router = new express.Router();
const User = require('../models/userModel');

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.query.resource.replace('acct:', '') }).exec();
    if (!user) {
      return res.status(404).json({
        message: 'No record found.'
      });
    }
    else {
      res.json(JSON.parse(user.webFinger));
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

module.exports = router;






// User.findOne({name: req.query.resource.replace('acct:', '') }).then((user) => {
//   if(!user) {
//     return res.status(404).json({
//       message: 'No record found.'
//     });
//   }
//   res.json(JSON.parse(user.webFinger));
// }).catch((e) => {
//   return res.status(500).json({
//     message: 'Something went wrong.'
//   });
// });

const express = require('express');
const router = new express.Router();
const User = require('../models/userModel');

router.get('/', async (req, res) => {
  const name = req.query.resource.match(/:(.*)@/).pop();
  try {
    const user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).json({
        message: `No record found for ${name}`
      });
    }
    else {
      return res.json(JSON.parse(user.webFinger));
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

module.exports = router;

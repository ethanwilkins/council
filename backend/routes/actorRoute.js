const express = require('express');
const router = new express.Router();
const User = require('../models/userModel');

router.get('/:name/followers', async (req, res) => {
  const { name } = req.params;
  const domain = req.headers.host;
  try {
    const user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).json({
        message: `No record found for ${name}`
      });
    }
    else {
      user.actorFollowers = user.actorFollowers || '[]';
      let followers = JSON.parse(user.actorFollowers);
      let followersCollection = {
        "type": "OrderedCollection",
        "totalItems": followers.length,
        "id": `https://${domain}/u/${name}/followers`,
        "first": {
          "type": "OrderedCollectionPage",
          "totalItems": followers.length,
          "partOf": `https://${domain}/u/${name}/followers`,
          "orderedItems": followers,
          "id":`https://${domain}/u/${name}/followers?page=1`
        },
        "@context":["https://www.w3.org/ns/activitystreams"]
      };
      return res.json(followersCollection);
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).json({
        message: `No record found for ${name}`
      });
    }
    else {
      return res.json(JSON.parse(user.actor));
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

router.get('/webfinger/:resource', async (req, res) => {
  const { resource } = req.params;
  const name = resource.match(/:(.*)@/).pop();

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

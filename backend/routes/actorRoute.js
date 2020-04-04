'use strict';
const express = require('express'),
      router = express.Router();

router.get('/:name', async (req, res) => {
  let name = req.params.name;
  if (!name) {
    return res.status(400).send('Bad request.');
  }
  else {
    let domain = req.app.get('domain');
    let username = name;
    name = `${name}@${domain}`;

    let user = await User.find({name: name});

    if (user === undefined) {
      return res.status(404).send(`No record found for ${name}.`);
    }
    else {
      let tempActor = JSON.parse(user.actor);
      // Added this followers URI for Pleroma compatibility, see https://github.com/dariusk/rss-to-activitypub/issues/11#issuecomment-471390881
      // New Actors should have this followers URI but in case of migration from an old version this will add it in on the fly
      if (tempActor.followers === undefined) {
        tempActor.followers = `https://${domain}/u/${username}/followers`;
      }
      res.json(tempActor);
    }
  }
});

router.get('/:name/followers', async (req, res) => {
  let name = req.params.name;
  if (!name) {
    return res.status(400).send('Bad request.');
  }
  else {
    let domain = req.app.get('domain');

    let user = await User.find({name: name});

    console.log(user);
    user.followers = user.followers || '[]';
    let followers = JSON.parse(user.followers);
    let followersCollection = {
      "type":"OrderedCollection",
      "totalItems":followers.length,
      "id":`https://${domain}/u/${name}/followers`,
      "first": {
        "type":"OrderedCollectionPage",
        "totalItems":followers.length,
        "partOf":`https://${domain}/u/${name}/followers`,
        "orderedItems": followers,
        "id":`https://${domain}/u/${name}/followers?page=1`
      },
      "@context":["https://www.w3.org/ns/activitystreams"]
    };
    res.json(followersCollection);
  }
});

module.exports = router;

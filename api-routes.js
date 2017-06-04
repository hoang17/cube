const router = require('express').Router()

const Group = require('./models/Group')
const Like = require('./models/Like')
const Friend = require('./models/Friend')

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const Feed = db.get('feeds_498287336961883')

router.route('/groups')
  .get(function(req, res) {
    Group.find().lean().exec(function(err, groups) {
      if (err)
        res.send(err)
      res.json(groups)
    })
  })
  .post(function(req, res) {
    var group = new Group()
    group.name = req.body.name
    group.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Group created!' });
    })
  })
router.route('/likes')
  .get(function(req, res) {
    Like.find().lean().exec(function(err, likes) {
      if (err)
        res.send(err)
      res.json(likes)
    })
  })

router.route('/feeds')
  .get(function(req, res) {
    Feed.find().then(function(feeds) {
      res.json(feeds)
    }).catch((err) => {
      res.send(err)
    }).then(() => db.close())
  })

router.route('/friends')
  .get(function(req, res) {
    Friend.find().lean().exec(function(err, friends) {
      if (err)
        res.send(err)
      res.json(friends)
    })
  })

module.exports = router

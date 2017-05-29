const router = require('express').Router()

const Group = require('./models/Group')
const Like = require('./models/Like')
// const Feed = require('./models/Feed')

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

module.exports = router

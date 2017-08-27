// const _ = require('lodash')
const router = require('express').Router()

const Group = require('./models/Group')
const Like = require('./models/Like')
const Page = require('./models/Page')
const Friend = require('./models/Friend')

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const Feed = db.get('feeds_498287336961883')

const pages = db.get('pages')

const cubes = db.get('cubes')

router.route('/pages')
  .get(async function(req, res) {
    let data = await pages.find()
    res.json(data)
  })
  .post(async function(req, res) {
    let page = req.body
    if (page._id){
      pages.update({'_id': page._id }, page)
      res.json({ message: 'Page updated', _id: page._id })
    } else {
      page = await pages.insert(page)
      res.json({ message: 'Page created', _id: page._id })
    }
  })

router.route('/pages/:id')
  .get(async function(req, res) {
    let id = req.params.id
    let page = await pages.findOne({_id: id})
    res.json(page)
  })
  .delete(async function(req, res) {
    let data = await pages.remove({ _id: req.params.id })
    res.json({ message: 'Page deleted', _id: req.params.id })
  })

router.route('/cubes/:id')
  .delete(async function(req, res) {
    let data = await cubes.remove({ _id: req.params.id })
    res.json({ message: 'Cube deleted', _id: req.params.id })
  })

router.route('/cubes')
  .get(async function(req, res) {
    let data = await cubes.find()
    res.json(data)
  })
  .post(async function(req, res) {
    let cube = req.body
    cube.active = false
    if (cube._id){
      cubes.update({'_id': cube._id }, cube)
      res.json({ message: 'Cube updated', _id: cube._id })
    } else {
      cube = await cubes.insert(cube)
      res.json({ message: 'Cube created', _id: cube._id })
    }
  })

router.route('/cubes/:id')
  .delete(async function(req, res) {
    let data = await cubes.remove({ _id: req.params.id })
    res.json({ message: 'Cube deleted', _id: req.params.id })
  })

router.route('/groups')
  .get(function(req, res) {
    // Group.find().sort({ bookmark_order : 'asc'}).lean().exec(function(err, groups) {
    Group.find().exec(function(err, groups) {
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
      res.json({ message: 'Group created' });
    })
  })

router.route('/groups/:id')
  .get(function(req, res) {
    var id = req.params.id
    Group.findOne({id: id}, function(err, group) {
      if (err)
        res.send(err)
      res.json(group)
    })
  })
  .patch(function (req, res) {
    Group.update({id: req.params.id}, req.body).exec(function(err) {
      if (err)
        res.send(err)
      res.json({ message: 'Group updated' })
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

  router.route('/likes/:id')
    .get(function(req, res) {
      var id = req.params.id
      Like.findOne({id: id}, function(err, like) {
        if (err)
          res.send(err)
        res.json(like)
      })
    })
    .patch(function (req, res) {
      Like.update({id: req.params.id}, req.body).exec(function(err) {
        if (err)
          res.send(err)
        res.json({ message: 'Like updated' })
      })
    })

// router.route('/pages')
//   .get(function(req, res) {
//     Page.find().lean().exec(function(err, pages) {
//       if (err)
//         res.send(err)
//       res.json(pages)
//     })
//   })
//
//   router.route('/pages/:id')
//     .get(function(req, res) {
//       var id = req.params.id
//       Page.findOne({id: id}, function(err, like) {
//         if (err)
//           res.send(err)
//         res.json(like)
//       })
//     })
//     .patch(function (req, res) {
//       Page.update({id: req.params.id}, req.body).exec(function(err) {
//         if (err)
//           res.send(err)
//         res.json({ message: 'Page updated' })
//       })
//     })

router.route('/feeds').get(async function(req, res) {
  let query = req.query
  let options = {
    'limit': Number(query.limit),
    'skip': Number(query.skip)
    // 'sort': query.sort
  }
  let data = await findFeeds({}, options)
  res.json(data)
})

async function findFeeds(query, options){
  let feeds = await Feed.find(query, options)
  let count = await Feed.count(query)
  db.close()
  return { feeds, count }
}

module.exports = router

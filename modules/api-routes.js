// const _ = require('lodash')
const router = require('express').Router()

var options = {  keepAlive: 300000, connectTimeoutMS: 30000 }

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI, options)

const pages = db.get('pages')

const cubes = db.get('cubes')

router.route('/pages')
  .get(async function(req, res) {
    let data = await pages.find()
    res.json(data)
  })
  .post(async function(req, res) {
    let page = req.body
    if (page.new){
      delete page.new
      page = await pages.insert(page)
      res.json({ message: 'Page created', _id: page._id })
    } else {
      pages.update({'_id': page._id }, page)
      res.json({ message: 'Page updated', _id: page._id })
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


module.exports = router

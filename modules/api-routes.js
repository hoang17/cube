const router = require('express').Router()

var options = {  keepAlive: 300000, connectTimeoutMS: 30000 }

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI, options)

const cubes = db.get('cubes')
const pages = db.get('pages')
const styles = db.get('styles')

try {
  pages.createIndex('uid')
  pages.createIndex('host')
  pages.createIndex({ url: 1 }, { unique: true })
  // pages.index('path')
  // pages.index(['host', 'path'])
} catch (e) {
  console.error(e)
}

router.route('/styles')
  .get(async function(req, res) {
    let data = await styles.find()
    res.json(data)
  })
  .post(async function(req, res) {
    let style = await styles.insert(req.body)
    res.json({ message: 'Style created', _id: style._id })
  })
  .put(async function(req, res) {
    let style = req.body
    styles.update({'_id': style._id }, style)
    res.json({ message: 'Style updated', _id: style._id })
  })

router.route('/styles/:id')
  .get(async function(req, res) {
    let id = req.params.id
    let style = await styles.findOne({_id: id})
    res.json(style)
  })
  .delete(async function(req, res) {
    let data = await styles.remove({ _id: req.params.id })
    res.json({ message: 'Style deleted', _id: req.params.id })
  })


router.route('/pages')
  .get(async function(req, res) {
    let data = await pages.find()
    res.json(data)
  })
  .post(async function(req, res) {
    let page = await pages.insert(req.body)
    res.json({ message: 'Page created', _id: page._id })
  })
  .put(async function(req, res) {
    let page = req.body
    pages.update({'_id': page._id }, page)
    res.json({ message: 'Page updated', _id: page._id })
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

router.route('/routes')
  .post(async function(req, res) {
    let url = req.body.url
    log(url)
    let page = await pages.findOne({url: url})
    let id = page ? page._id : null
    res.send(id)
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
    cube = await cubes.insert(req.body)
    res.json({ message: 'Cube created', _id: cube._id })
  })
  .put(async function(req, res) {
    let cube = req.body
    cubes.update({'_id': cube._id }, cube)
    res.json({ message: 'Cube updated', _id: cube._id })
  })

router.route('/cubes/:id')
  .delete(async function(req, res) {
    let data = await cubes.remove({ _id: req.params.id })
    res.json({ message: 'Cube deleted', _id: req.params.id })
  })


module.exports = router

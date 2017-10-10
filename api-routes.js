const jwt = require('jsonwebtoken')

const options = {  keepAlive: 300000, connectTimeoutMS: 30000 }

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI, options)

const cubes = db.get('cubes')
const pages = db.get('pages')
const styles = db.get('styles')

try {
  cubes.createIndex('uid')
  styles.createIndex('uid')

  cubes.createIndex(['_id', 'uid'])
  styles.createIndex(['_id', 'uid'])
  pages.createIndex(['_id', 'uid'])

  pages.createIndex('uid')
  pages.createIndex('host')
  pages.createIndex({ url: 1 }, { unique: true })
  // pages.index('path')
  // pages.index(['host', 'path'])
} catch (e) {
  console.error(e)
}

const authenticate = (req, res, next) => {
  var token = req.headers['x-token']
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false, message: 'Auth failed' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({ success: false, message: 'Failed Auth' })
  }
}

const router = require('express').Router()

router.use(authenticate)

router.route('/view')
  .post(async function(req, res) {
    let data = {}
    data.page = await pages.findOne({url:req.body.url})
    if (!data.page) return res.json(data)
    let styleIds = Object.keys(data.page.styles)
    let cubeIds = Object.keys(data.page.blocks)
    data.styles = styleIds.length > 0 ? await styles.find({_id: {$in: styleIds }}) : []
    data.cubes = cubeIds.length > 0 ? await cubes.find({_id: {$in: cubeIds }}) : []
    res.json(data)
  })

router.route('/styles')
  .get(async function(req, res) {
    let uid = req.decoded.id
    let data = await styles.find({ uid:uid })
    res.json(data)
  })
  .post(async function(req, res) {
    let style = await styles.insert(req.body)
    res.json({ message: 'Style created', _id: style._id })
  })
  .put(async function(req, res) {
    let uid = req.user._id+''
    let style = req.body
    let data = await styles.update({'_id': style._id, uid: uid }, style)
    if (data.nModified == 1)
      res.json({ message: 'Style updated', _id: style._id })
    else
      res.status(403).send({ message: 'Update failed' })
  })

router.route('/styles/:id')
  .get(async function(req, res) {
    let id = req.params.id
    let style = await styles.findOne({_id: id})
    res.json(style)
  })
  .delete(async function(req, res) {
    let uid = req.user._id+''
    let id = req.params.id
    let data = await styles.remove({ _id: id, uid: uid })
    if (data.deletedCount == 1)
      res.json({ message: 'Style deleted', _id: id })
    else
      res.status(403).send({ message: 'Deletion failed' })
  })

router.route('/pages')
  .get(async function(req, res) {
    let uid = req.decoded.id
    let data = await pages.find({ uid:uid })
    res.json(data)
  })
  .post(async function(req, res) {
    let page = await pages.insert(req.body)
    res.json({ message: 'Page created', _id: page._id })
  })
  .put(async function(req, res) {
    let uid = req.user._id+''
    let page = req.body
    let data = await pages.update({'_id': page._id, uid: uid }, page)
    if (data.nModified == 1)
      res.json({ message: 'Page updated', _id: page._id })
    else
      res.status(403).send({ message: 'Update failed' })
  })

router.route('/pages/:id')
  .get(async function(req, res) {
    let id = req.params.id
    let page = await pages.findOne({_id: id})
    res.json(page)
  })
  .delete(async function(req, res) {
    let uid = req.user._id+''
    let id = req.params.id
    let data = await pages.remove({ _id: id, uid: uid })
    if (data.deletedCount == 1)
      res.json({ message: 'Page deleted', _id: req.params.id })
    else
      res.status(403).send({ message: 'Deletion failed' })
  })

router.route('/routes')
  .post(async function(req, res) {
    let url = req.body.url
    // log(url)
    let page = await pages.findOne({url: url})
    let id = page ? page._id : null
    res.send(id)
  })

router.route('/cubes')
  .get(async function(req, res) {
    let uid = req.decoded.id
    let data = await cubes.find({ uid:uid },{sort : { link : 1 }})
    res.json(data)
  })
  .post(async function(req, res) {
    cube = await cubes.insert(req.body)
    res.json({ message: 'Cube created', _id: cube._id })
  })
  .put(async function(req, res) {
    let uid = req.user._id+''
    let cube = req.body
    let data = await cubes.update({'_id': cube._id, uid: uid }, cube)
    if (data.nModified == 1)
      res.json({ message: 'Cube updated', _id: cube._id })
    else
      res.status(403).send({ message: 'Update failed' })
  })

router.route('/cubes/:id')
  .delete(async function(req, res) {
    let uid = req.user._id+''
    let id = req.params.id
    let data = await cubes.remove({ _id: id, uid: uid })
    if (data.deletedCount == 1)
      res.json({ message: 'Cube deleted', _id: id })
    else
      res.status(403).send({ message: 'Deletion failed' })
  })

module.exports = router

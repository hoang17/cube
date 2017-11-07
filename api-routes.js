const jwt = require('jsonwebtoken')

const db = require('./modules/mongo')

const cubes = db.cubes
const pages = db.pages

try {
  cubes.createIndex('uid')

  cubes.createIndex(['_id', 'uid'])
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
        console.err(err)
        return res.status(403).send({ message: 'Auth failed' })
      }
      else {
        req.decoded = decoded
        next()
      }
    })
  }
  else
    return res.status(403).send({ message: 'Failed auth' })
}

const router = require('express').Router()

router.use(authenticate)

router.route('/view')
  .post(async function(req, res) {
    let data = {}
    data.page = await pages.findOne({url:req.body.url})
    if (!data.page) return res.json(data)
    const cubeIds = Object.keys(data.page.blocks)
    data.cubes = cubeIds.length > 0 ? await cubes.find({_id: {$in: cubeIds }}) : []
    res.json(data)
  })

router.route('/pages')
  .get(async function(req, res) {
    const uid = req.decoded.id
    const data = await pages.find({ uid:uid })
    res.json(data)
  })
  .post(async function(req, res) {
    try {
      const data = await pages.insert(req.body)
      res.json({ message: 'Page created', _id: data._id, data })
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Page creation failed' })
    }
  })
  .put(async function(req, res) {
    try {
      const uid = req.user._id+''
      const page = req.body
      const data = await pages.update({'_id': page._id, uid: uid }, page)
      if (data.nModified > 0)
        res.json({ message: 'Page updated', _id: page._id, data })
      else
        res.json({ message: 'Nothing updated', _id: page._id, data })
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Page update failed' })
    }
  })

router.route('/pages/:id')
  .get(async function(req, res) {
    const id = req.params.id
    const page = await pages.findOne({_id: id})
    res.json(page)
  })
  .delete(async function(req, res) {
    try {
      const uid = req.user._id+''
      const id = req.params.id
      const data = await pages.remove({ _id: id, uid: uid })
      if (data.deletedCount > 0)
        res.json({ message: 'Page deleted', _id: req.params.id, data })
      else
        res.json({ message: 'Nothing deleted', _id: req.params.id, data })
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Page deletion failed' })
    }
  })

router.route('/routes')
  .post(async function(req, res) {
    const url = req.body.url
    // log(url)
    const page = await pages.findOne({url: url})
    const id = page ? page._id : null
    res.send(id)
  })

router.route('/cubes')
  .get(async function(req, res) {
    const uid = req.decoded.id
    const data = await cubes.find({ uid:uid },{sort : { order : 1 }})
    res.json(data)
  })
  .post(async function(req, res) {
    try {
      const data = await cubes.insert(req.body)
      res.json({ message: 'Cube created', _id: data._id, data })
    } catch (e) {
      console.err(e);
      res.status(500).send({ message: 'Cube creation failed' })
    }
  })
  .put(async function(req, res) {
    try {
      const uid = req.user._id+''
      const cube = req.body
      const data = await cubes.update({'_id': cube._id, uid: uid }, cube)
      if (data.nModified > 0)
        res.send({ message: 'Cube updated', _id: cube._id, data })
      else
        res.send({ message: 'Nothing updated', _id: cube._id, data })
    } catch (e) {
      console.err(e);
      res.status(500).send({ message: 'Cube update failed' })
    }
  })

router.route('/cubes/:id')
  .delete(async function(req, res) {
    try {
      const uid = req.user._id+''
      const id = req.params.id
      const data = await cubes.remove({ _id: id, uid: uid })
      if (data.deletedCount > 0)
        res.json({ message: 'Cube deleted', _id: id, data })
      else
        res.json({ message: 'Nothing deleted', _id: id, data })
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Cube deletion failed' })
    }
  })

module.exports = router

// const bluebird = require('bluebird')
// const graph = bluebird.promisifyAll(require('fbgraph'))

exports.groups = (req, res) => {

  const Group = require('../models/Group')
  let groups = await Group.find().lean()
  res.render('groups', {
    title: 'Groups',
    groups: groups
  })
}

// exports.fetchData = (req, res) => {
//   const token = req.user.tokens.find(token => token.kind === 'facebook')
//   graph.setVersion("2.3")
//   graph.setAccessToken(token.accessToken)
//   graph.getAsync(`${req.user.facebook}/groups`, {limit: 20}).then(results => {
//     const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)
//     const groups = db.get('groups')
//     groups.insert(results.data).then(() => db.close())
//   })
// }

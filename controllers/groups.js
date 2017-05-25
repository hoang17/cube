// const bluebird = require('bluebird')
// const graph = bluebird.promisifyAll(require('fbgraph'))

const Vue = require('vue')

exports.index = (req, res) => {

  // var Group = require('../models/Group')
  // Group.find((err, groups) => {
  //   if (err) res.send(err)
  //   res.render('groups', {
  //     title: 'Groups',
  //     groups: groups
  //   })
  // })

  res.render('groups', {title: 'Groups'})

  // const app = new Vue({
  //   data: {
  //     url: req.url
  //   },
  //   template: `<div>The visited URL is: {{ url }} - ssr</div>`
  // })
  //
  // res.render('groups', {title: 'Groups'}, (err, template) => {
  //
  //   const renderer = require('vue-server-renderer').createRenderer({
  //     template: template
  //   })
  //
  //   renderer.renderToString(app, (err, html) => {
  //     if (err) {
  //       res.status(500).end('Internal Server Error')
  //       return
  //     }
  //     res.end(html)
  //   })
  // })
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

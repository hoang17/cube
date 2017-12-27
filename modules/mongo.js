const options = {  keepAlive: 300000, connectTimeoutMS: 30000 }
const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI, options)

const cubes = db.get('cubes')
const pages = db.get('pages')
const users = db.get('users')
const plans = db.get('plans', { castIds: false })
const customers = db.get('customers', { castIds: false })
const subs = db.get('subscriptions', { castIds: false })
const charges = db.get('charges', { castIds: false })
const coupons = db.get('coupons', { castIds: false })
const invoices = db.get('invoices', { castIds: false })

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

module.exports = { cubes, pages, users, plans, customers, subs, charges, coupons, invoices }

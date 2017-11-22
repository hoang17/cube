const jwt = require('jsonwebtoken')

const { plans, customers, subs, charges, cubes, pages } = require('./modules/mongo')

const stripe = require('stripe')(process.env.STRIPE_SKEY)
stripe.setApiVersion("2017-08-15")

function getAmount(handle){
  if (handle == 'basic-plan')
    return 1000
  if (handle == 'med-plan')
    return 5000
}

// const cubes = db.cubes
// const pages = db.pages

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

router.route('/stripeSubscribe')
  .post(async function(req, res) {
    try {
      // const plan = await stripe.plans.create({
      //   name: "Basic Yearly Plan 2",
      //   id: "basic-yearly-2",
      //   interval: "year",
      //   currency: "usd",
      //   amount: 1000
      // })
      // console.log(plan);
      // res.send(plan)

      // plans.insert(plan)

      // console.log(req.body);

      // const amount = getAmount(req.body.handle)

      // if (!amount)
      //   res.status(500).send({ message: 'Invalid amount' })

      console.log(req.body.token);

      const plan = req.body.handle

      console.log('plan', plan);

      if (!plan)
        res.status(500).send({ message: 'Invalid plan' })

      const customer = await stripe.customers.create({
        email: req.body.email,
        source: req.body.token
      })

      customer._id = customer.id

      delete customer.id

      // console.log('customer', customer);

      customers.insert(customer)

      // {
      //   "id": "cus_4fdAW5ftNQow1a",
      //   "object": "customer",
      //   "account_balance": 0,
      //   "created": 1509983492,
      //   "currency": null,
      //   ...
      //   "livemode": false,
      //   "email": "jenny.rosen@example.com",
      //   ...
      // }

      // const charge = await stripe.charges.create({
      //   amount,
      //   description: "Sample Charge",
      //   currency: "usd",
      //   customer: customer._id
      // })

      // charges.insert(charge)

      // {
      //   "id": "ch_1BLP19Gtxrv3ly56RrGMax5h",
      //   "object": "charge",
      //   "amount": 1000,
      //   "amount_refunded": 0,
      //   "application": null,
      //   "application_fee": null,
      //   "balance_transaction": "txn_1BLP19Gtxrv3ly56aQ0h1mmV",
      //   "captured": true,
      //   "created": 1510030135,
      //   "currency": "usd",
      //   "customer": "cus_BiqiOAPAXhrdQC",
      //   "description": "Sample Charge",
      //   "destination": null,
      //   "dispute": null,
      //   "failure_code": null,
      //   "failure_message": null,
      //   "fraud_details": {},
      //   "invoice": null,
      //   "livemode": false,
      //   "metadata": {},
      //   "on_behalf_of": null,
      //   "order": null,
      //   "outcome": {
      //     "network_status": "approved_by_network",
      //     "reason": null,
      //     "risk_level": "normal",
      //     "seller_message": "Payment complete.",
      //     "type": "authorized"
      //   },
      //   "paid": true,
      //   "receipt_email": null,
      //   "receipt_number": null,
      //   "refunded": false,
      //   "refunds": {
      //     "object": "list",
      //     "data": [],
      //     "has_more": false,
      //     "total_count": 0,
      //     "url": "/v1/charges/ch_1BLP19Gtxrv3ly56RrGMax5h/refunds"
      //   },
      //   "review": null,
      //   "shipping": null,
      //   "source": {
      //     "id": "card_1BLOzbGtxrv3ly56hgEaPoAj",
      //     "object": "card",
      //     "address_city": null,
      //     "address_country": null,
      //     "address_line1": null,
      //     "address_line1_check": null,
      //     "address_line2": null,
      //     "address_state": null,
      //     "address_zip": null,
      //     "address_zip_check": null,
      //     "brand": "Visa",
      //     "country": "US",
      //     "customer": "cus_BiqiOAPAXhrdQC",
      //     "cvc_check": "pass",
      //     "dynamic_last4": null,
      //     "exp_month": 11,
      //     "exp_year": 2021,
      //     "fingerprint": "VOIYfYRNzJvMndUp",
      //     "funding": "credit",
      //     "last4": "4242",
      //     "metadata": {},
      //     "name": "lehuyhoang117@gmail.com",
      //     "tokenization_method": null
      //   },
      //   "source_transfer": null,
      //   "statement_descriptor": null,
      //   "status": "succeeded",
      //   "transfer_group": null
      // }

      const subscription = await stripe.subscriptions.create({
        customer: customer._id,
        items: [
          {
            plan,
          },
        ],
      })

      subs.insert(subscription)

      // {
      //   "id": "sub_BiqmzzNbJ3uwhW",
      //   "object": "subscription",
      //   "application_fee_percent": null,
      //   "billing": "charge_automatically",
      //   "cancel_at_period_end": false,
      //   "canceled_at": null,
      //   "created": 1510030365,
      //   "current_period_end": 1512622365,
      //   "current_period_start": 1510030365,
      //   "customer": "cus_BiqmWycF4Vecm4",
      //   "discount": null,
      //   "ended_at": null,
      //   "items": {
      //     "object": "list",
      //     "data": [
      //       {
      //         "id": "si_1BLP4rGtxrv3ly56SDBORs8z",
      //         "object": "subscription_item",
      //         "created": 1510030365,
      //         "metadata": {},
      //         "plan": {
      //           "id": "basic-monthly",
      //           "object": "plan",
      //           "amount": 1000,
      //           "created": 1509807078,
      //           "currency": "usd",
      //           "interval": "month",
      //           "interval_count": 1,
      //           "livemode": false,
      //           "metadata": {},
      //           "name": "Basic Plan",
      //           "statement_descriptor": "Cube Builder",
      //           "trial_period_days": 15
      //         },
      //         "quantity": 1
      //       }
      //     ],
      //     "has_more": false,
      //     "total_count": 1,
      //     "url": "/v1/subscription_items?subscription=sub_BiqmzzNbJ3uwhW"
      //   },
      //   "livemode": false,
      //   "metadata": {},
      //   "plan": {
      //     "id": "basic-monthly",
      //     "object": "plan",
      //     "amount": 1000,
      //     "created": 1509807078,
      //     "currency": "usd",
      //     "interval": "month",
      //     "interval_count": 1,
      //     "livemode": false,
      //     "metadata": {},
      //     "name": "Basic Plan",
      //     "statement_descriptor": "Cube Builder",
      //     "trial_period_days": 15
      //   },
      //   "quantity": 1,
      //   "start": 1510030365,
      //   "status": "active",
      //   "tax_percent": null,
      //   "trial_end": null,
      //   "trial_start": null
      // }

      subscription._id = subscription.id

      delete subscription.id

      // console.log('subscription', subscription);

      res.send({
        title: 'Payment',
        customer,
        subscription,
      })

    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Payment failed' })
    }
  })
module.exports = router

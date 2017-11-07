const { plans, customers, subs, charges } = require('../modules/mongo')

const stripe = require('stripe')(process.env.STRIPE_SKEY)
stripe.setApiVersion("2017-08-15")

function getAmount(handle){
  if (handle == 'basic-plan')
    return 1000
  if (handle == 'med-plan')
    return 5000
}

exports.charge = async (req, res) => {
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

    const plan = req.body.handle

    console.log('plan', plan);

    if (!plan)
      res.status(500).send({ message: 'Invalid plan' })

    const customer = await stripe.customers.create({
       email: req.body.stripeEmail,
      source: req.body.stripeToken
    })

    const stripeTokenType = req.body.stripeTokenType // 'card'

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

    res.render('payment', {
      title: 'Payment',
      customer,
      subscription,
    })

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Payment failed' })
  }
}

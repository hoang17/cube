import axios from 'axios'
const port = process.env.PORT || 3000
const isClient = process.env.VUE_ENV === 'client'
const host = isClient ? window.location.origin : `http://localhost:${port}`

const api = axios.create({
  baseURL: `${host}/api/`,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export async function get(endpoint, params){
  let response = await api.get(endpoint, { params })
  return response.data
}

var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('./lib/pouchdb-live-find'))
var feedDb = new PouchDB('feeds')
feedDb.createIndex({
  index: {
    fields: ['group_id','updated_time']
  }
})
feedDb.createIndex({
  index: {
    fields: ['group_id']
  }
})
feedDb.createIndex({
  index: {
    fields: ['updated_time']
  }
})

feedDb.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function (change) {
  console.log(change)
}).on('error', function (err) {
  console.error(err)
})

if (isClient){
  window.PouchDB = PouchDB
}

async function setupDB(){
  // await feedDb.destroy()
  feedDb = new PouchDB('feeds')
  await feedDb.createIndex({
    index: {
      fields: ['group_id','updated_time']
    }
  })
  await feedDb.createIndex({
    index: {
      fields: ['group_id']
    }
  })
  await feedDb.createIndex({
    index: {
      fields: ['updated_time']
    }
  })
  return feedDb
}

export async function fetchLive(id, skip, limit){
  if (!feedDb) {
    feedDb = await setupDB()
  }
  return new Promise(function(resolve, reject) {
    let liveFeed = feedDb.liveFind({
      selector: {
        $and: [
          { group_id: id },
          { updated_time: {$gt: null} }
        ]
      },
      sort: [{'updated_time': 'desc'}],
      skip: skip,
      limit: limit,
      aggregate: true
    })
    .on('update', function(update, aggregate) {
      // update.action is 'ADD', 'UPDATE', or 'REMOVE'
      // update also contains id, rev, and doc
      // console.log(update.action, update.id)
      // aggregate is an array of docs containing the latest state of the query
      // the array is immutable which means that every change is a new Object
      // this plays well with rendering engines like React and Angular
      // change detection can be done by simply Object equality, `oldDoc === newDoc`
      // refreshUI(aggregate)
      // (refreshUI would be a function you write to pipe the changes to your rendering engine)
      console.log(aggregate)
      resolve(aggregate)
    })
    .then(function(feeds){
      console.log(feeds);
    })
    // .on('ready', function(a, b) {
    //   console.log('Initial query complete')
    // })
    // .on('cancelled', function() {
    //   console.log('Live find cancelled')
    // })
    // .on('error', function(err) {
    //   console.error('Live find error', err)
    // })
  });
}

const token = "EAACTwZBgD6mUBAHgChYLWy78DcnWEOYy9gl55E0sEi87pJIRz7R4fcY0nocZBO1grPeDrJo32NK5n529g3m0jHbcAdlZA7RyRwnTr3TP1JDbnXt3ZBtzWNNt4MeoV1sMnxWPGs8zqbf1FStll5U5sZCKjhbhruMQ2q52jk0rjogZDZD"

const fb = axios.create({
  baseURL: 'https://graph.facebook.com/',
  params: { access_token: token }
})

const fetchDocs =  async function(id, ver, params){
  let url = `${ver}/${id}/feed`
  let res = await fb.get(url, { params: params })
  if (isClient) {
    let docs = res.data.data.map(function(e){
      e._id = e.id
      e.group_id = id
      return e
    })
    feedDb.bulkDocs(docs)
  }
  return res.data.data
}

const fetchData = async function(id, ver, params) {
  console.log('fetchData')
  try {
    var data
    if (isClient) {
      if (!feedDb) {
        feedDb = await setupDB()
      }

      let result = await feedDb.find({
        selector: {
          $and: [
            { group_id: id },
            { updated_time: {$gt: null} }
          ]
        },
        sort: [{'updated_time': 'desc'}],
        limit: params.limit,
        skip: params.offset
      })

      // console.log(params)
      // console.log(result)

      data = result.docs
    }
    if (data.length == 0)
      data = await fetchDocs(id, ver, params)
    else
      fetchDocs(id, ver, params)
    return data
  } catch (e) {
    console.error(e)
  }
}

export async function fetchItems(id, offset, limit, ver){
  return fetchData(id, ver, { fields: 'id,message,picture,full_picture,place,type,from{name, picture},story,link,name,description,attachments,comments.summary(true){message,from{name,picture},comments{message,from{name,picture},attachment},comment_count,like_count,created_time,attachment},created_time,updated_time', offset: offset, limit: limit })
}

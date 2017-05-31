const bluebird = require('bluebird');
const graph = bluebird.promisifyAll(require('fbgraph'));
const dotenv = require('dotenv');
const program = require('commander');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

program
  .version('0.0.1')
  .option('-e, --endpoint [endpoint]', 'facebook Graph API endpoint')
  .option('-c, --collection [collection]', 'MongoDB collection name')
  .parse(process.argv)

const endpoint = program.endpoint
const collection = program.collection

console.log(endpoint)
console.log(collection)

const maxPage = 100
let page = 0

const fetchData = async function(url, model) {
  page++
  console.log("page", page)
  console.log("begin fetching...")
  const res = await graph.getAsync(url, { limit: 500 })
  console.log("data fetched", res.data.length)
  if (res.paging && res.paging.next && page < maxPage) {
    await model.insert(res.data)
    return fetchData(res.paging.next, model)
  } else {
    console.log("page end", page)
    return model.insert(res.data)
  }
}

const token = "EAACTwZBgD6mUBAHgChYLWy78DcnWEOYy9gl55E0sEi87pJIRz7R4fcY0nocZBO1grPeDrJo32NK5n529g3m0jHbcAdlZA7RyRwnTr3TP1JDbnXt3ZBtzWNNt4MeoV1sMnxWPGs8zqbf1FStll5U5sZCKjhbhruMQ2q52jk0rjogZDZD"
graph.setVersion("2.3")
graph.setAccessToken(token)

const model = db.get(collection)

model.drop()

// fetchData(`504368183/${endpoint}`, model).then(() => {

fetchData(`${endpoint}`, model).then(function(){
  db.close()
}).catch(function(e){
  console.log(e)
})

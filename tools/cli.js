const bluebird = require('bluebird');
const graph = bluebird.promisifyAll(require('fbgraph'));
const dotenv = require('dotenv');
const program = require('commander');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

program
  .version('0.0.1')
  .option('-e, --endpoint [endpoint]', 'facebook Graph API endpoint')
  .parse(process.argv)

const endpoint = program.endpoint

const fetchData = async function(url, model) {
  const res = await graph.getAsync(url, { limit: 500 })
  console.log(res)
  if (res.paging && res.paging.next) {
    await model.insert(res.data)
    return fetchData(res.paging.next, model)
  } else {
    return model.insert(res.data)
  }
}

const token = "EAACTwZBgD6mUBAHgChYLWy78DcnWEOYy9gl55E0sEi87pJIRz7R4fcY0nocZBO1grPeDrJo32NK5n529g3m0jHbcAdlZA7RyRwnTr3TP1JDbnXt3ZBtzWNNt4MeoV1sMnxWPGs8zqbf1FStll5U5sZCKjhbhruMQ2q52jk0rjogZDZD"
graph.setVersion("2.3");
graph.setAccessToken(token);

const model = db.get(endpoint)

model.drop()

let ep = endpoint

switch (endpoint){
  case "invitable_friends":
    ep = "friends"
  // case "home":
  //   ep = "feeds"
  default:
    ep = endpoint
}

console.log(ep)

fetchData(`504368183/${ep}`, model).then(() => {
  db.close()
})

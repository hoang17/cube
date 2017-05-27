const bluebird = require('bluebird');
const graph = bluebird.promisifyAll(require('fbgraph'));
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const fetchData = async function(url, model) {
  const res = await graph.getAsync(url, { limit: 500 })
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

const groups = db.get('groups')
const likes = db.get('likes')

groups.drop()
likes.drop()

Promise.all([
    fetchData("504368183/groups", groups),
    fetchData("504368183/likes", likes)
]).then(() => {
  db.close()
})

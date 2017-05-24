const bluebird = require('bluebird');
const graph = bluebird.promisifyAll(require('fbgraph'));
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const fetchData = url => {
  return graph.getAsync(url, { limit: 500 })
    .then(res => {
      if (res.paging && res.paging.next) {
        groups.insert(res.data)
        return fetchData(res.paging.next)
      } else {
        return groups.insert(res.data)
      }
    })
}

const token = "EAAIDDbedcTABABBSeTWhOZCdaq3UZB6k6Tu9kU8g686oZAQPoY46Li6ZBFu34OYYrZCDdmLw6O4Q3efR25IxQyYQjIf72j1rKvOoImiAz1JX9ZAimRLxZBOEbHyrsldPlVzQTYlZCua6nwNddLTdxmAa9ep2fjPAktIITFjtDQ9rdQZDZD"
graph.setVersion("2.3");
graph.setAccessToken(token);
const groups = db.get('groups')
groups.drop()
fetchData("504368183/groups").then(() => { db.close() })

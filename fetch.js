const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), { multiArgs: true });
const graph = bluebird.promisifyAll(require('fbgraph'));
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

const token = "EAAIDDbedcTABABBSeTWhOZCdaq3UZB6k6Tu9kU8g686oZAQPoY46Li6ZBFu34OYYrZCDdmLw6O4Q3efR25IxQyYQjIf72j1rKvOoImiAz1JX9ZAimRLxZBOEbHyrsldPlVzQTYlZCua6nwNddLTdxmAa9ep2fjPAktIITFjtDQ9rdQZDZD"
graph.setVersion("2.3");
graph.setAccessToken(token);
const groups = db.get('groups')
groups.drop()
fetchData("504368183/groups")

function fetchData(url){
  graph.getAsync(url, {limit: 500})
    .then(res => {
      groups.insert(res.data)
        .then(() => {
          if (res.paging && res.paging.next) {
            fetchData(res.paging.next)
          } else {
            db.close()
          }
        })
    })
}

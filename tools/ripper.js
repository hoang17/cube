const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)
const feeds = db.get('feeds')
feeds.drop()

const Nightmare = require('nightmare')
const nightmare = () => {
  return Nightmare({
    // show: true,
    webPreferences: {
      partition: 'persist: testing'
    }
  })
}

const nm = nightmare()

const run = async function(){

  let count = 0

  await nm
    .viewport(600, 4000)
    .goto('https://touch.facebook.com/groups/1665014747136239/')

  var previousHeight, currentHeight = 0

  while(previousHeight !== currentHeight && count < 10) {
    previousHeight = currentHeight

    var currentHeight = await nm.evaluate(function() {
      return document.body.scrollHeight;
    })

    await nm.scrollTo(currentHeight, 0).wait(2000)
    count++
  }

  var result = await nm.evaluate(function() {
    return [...document.querySelectorAll('article:not([data-ft=""]')].map(el => {
      const data = JSON.parse(el.getAttribute("data-ft"))
      if (data && data.top_level_post_id)
        return { id: data.top_level_post_id, name: el.innerText }
    }).filter(e => e != null)
  })

  await nm.end()

  console.log(result.length)
  await feeds.insert(result)
  db.close()
}

run()

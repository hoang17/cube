const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)
const feeds = db.get('feeds')
feeds.drop()

const Nightmare = require('nightmare')
const nm = () => {
  return Nightmare({
    // show: true,
    webPreferences: {
      partition: 'persist: testing'
    }
  })
}

nm()
  .viewport(600, 3500)
  .goto('https://mbasic.facebook.com/')
  // .evaluate(function() {
  //     document.querySelector('form#login_form > ul.bd.be.bf:nth-child(5) > li.be:nth-child(1) > input.bj.bk.bl:nth-child(2').value = 'thuythuy2424'
  // })
  // .insert('form#login_form > ul.bd.be.bf:nth-child(5) > li.be:nth-child(1) > input.bj.bk.bl:nth-child(2)', 'thuythuy2424')
  // .insert('form#login_form > ul.bd.be.bf:nth-child(5) > li.be:nth-child(2) > div:nth-child(1) > input.bj.bk.bm.bn:nth-child(2)', '86BuiThiXuan')
  // .click('form#login_form > ul.bd.be.bf:nth-child(5) > li.be:nth-child(3) > input.m.n.bo.bp.bq:nth-child(1)')
  .wait('div#m_newsfeed_stream > a:last-child')
  .screenshot('screen1.png')
  .evaluate(() => {
    return [...document.querySelectorAll('div[role="article"]')].map(el => {
      const data = JSON.parse(el.getAttribute("data-ft"))
      if (data && data.top_level_post_id)
        return { id: data.top_level_post_id, name: el.innerText }
    }).filter(e => e != null)
  })
  .end()
  .then(function (result) {
    console.log(result)
    feeds.insert(result)
  })

nm()
  .viewport(600, 3500)
  .goto('https://mbasic.facebook.com/')
  .wait('div#m_newsfeed_stream > a:last-child')
  .click('div#m_newsfeed_stream > a:last-child')
  .wait('div#search_div')
  .screenshot('screen2.png')
  .evaluate(() => {
    return [...document.querySelectorAll('div[role="article"]')].map(el => {
      const data = JSON.parse(el.getAttribute("data-ft"))
      if (data && data.top_level_post_id)
        return { id: data.top_level_post_id, name: el.innerText }
    }).filter(e => e != null)
  })
  .end()
  .then(function (result) {
    console.log(result)
    feeds.insert(result).then(()=> { db.close() })
  })
  .catch(function (error) {
    console.error('Error:', error);
  })

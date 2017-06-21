const bluebird = require('bluebird');
const graph = bluebird.promisifyAll(require('fbgraph'));
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const db = require('monk')(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

async function fetchData(url, model) {
  const res = await graph.getAsync(url, { limit: 500 })
  res.data.map(v => v.star = false)
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

async function run(){
  // const friends = db.get('friends')
  // friends.drop()
  // fetchData("504368183/invitable_friends", friends)

  const groupsDb = db.get('groups')
  const likesDb = db.get('likes')
  const gv = db.get('group_ver')

  groupsDb.drop()
  likesDb.drop()
  gv.drop()

  fetchData("504368183/likes", likesDb)

  await fetchData("504368183/groups", groupsDb)

  let groups = await groupsDb.find()

  groups.map(v => v.ver = v.privacy == 'OPEN' ? 'v2.4' : 'v2.3')

  console.log(groups.length)

  graph.setVersion("2.4")

  // count = 0
  // for (let group of groups) {
  //   try {
  //     count++
  //     const res = await graph.getAsync(group.id + '/feed?fields=id', { limit: 1 })
  //     let ver = res.data.length == 0 ? 'v2.3' : 'v2.4'
  //     await gv.insert({ group_id: group.id, ver: ver })
  //     console.log(count)
  //   } catch (e) {
  //     await gv.insert({ group_id: group.id, ver: 'v2.3' })
  //     console.log(count)
  //   }
  // }

  await Promise.all(groups.map(async (group) => {
    try {
      const res = await graph.getAsync(group.id + '/feed?fields=id', { limit: 1 })
      group.ver = res.data.length == 0 ? 'v2.3' : 'v2.4'
      let ob = { group_id: group.id, ver: group.ver }
      groupsDb.update({_id:group._id}, group)
      await gv.insert(ob)
    } catch (e) {
      group.ver = 'v2.3'
      let ob = { group_id: group.id, ver: group.ver }
      groupsDb.update({_id:group._id}, group)
      await gv.insert(ob)
    }
  }))

  db.close()
  console.log('done')
}

run()

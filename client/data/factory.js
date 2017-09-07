export const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export function newPage(host){
  let id = ObjectId()
  return {
    _id: id,
    name: 'Page',
    type: 'pg',
    host: host,
    path: id,
    url: host + '/' + id,
    userId: undefined,
    content: 'New Page 🙌🏻',
    css: undefined,
    style: {
      color: null,
      display: null,
      width: null,
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      lineHeight: null,
      letterSpacing: null,
      textTransform: null,
      textAlign: 'center',
      // flex: undefined,
      // flexFlow: undefined
    },
    cubes: [],
    new: true,
  }
}

export function newStyle(name){
  return {
    _id: ObjectId(),
    name: name,
    style: {
      color: undefined,
      display: undefined,
      width: undefined,
      height: undefined,
      fontFamily: undefined,
      fontSize: undefined,
      fontWeight: undefined,
      lineHeight: undefined,
      letterSpacing: undefined,
      textTransform: undefined,
      textAlign: undefined,
      padding: undefined,
      margin: undefined,
      border: undefined,
      borderRadius: undefined,
      minWidth: undefined,
      minHeight: undefined,
      maxWidth: undefined,
      maxHeight: undefined,
    },
  }
}

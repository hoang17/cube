import { ObjectId } from './factory'

export const text = {
  _id: ObjectId(),
  type: 'tx',
  name: 'Text',
  content: 'New text',
  css: null,
  link: false,
  links: [],
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
    textAlign: null,
    padding: null,
    margin: null,
  }
}

export const link = {
  _id: ObjectId(),
  type: 'lnk',
  name: 'Link',
  content: 'Link',
  url: null,
  css: null,
  link: false,
  links: [],
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
    padding: null,
    margin: null,
    border: null,
    borderRadius: null,
  }
}

export const button = {
  _id: ObjectId(),
  type: 'btn',
  name: 'Button',
  content: 'Button',
  url: null,
  css: null,
  link: false,
  links: [],
  style: {
    color: null,
    display: null,
    width: null,
    height: null,
    fontFamily: null,
    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    textTransform: null,
    textAlign: 'center',
    padding: null,
    margin: null,
  }
}

export const container = {
  _id: ObjectId(),
  type: 'container',
  name: 'Container',
  content: 'Container',
  css: null,
  link: false,
  links: [],
  style: {
    color: null,
    display: 'block',
    width: null,
    height: null,
    minWidth: null,
    minHeight: null,
    maxWidth: null,
    maxHeight: null,
    padding: null,
    margin: null,
    background: null,
    border: null,
    borderRadius: null,
    fontFamily: null,
    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    textTransform: null,
    textAlign: 'center',
    flex: null,
    flexFlow: null
  },
  cubes: []
}

export const navigation = {
  _id: ObjectId(),
  type: 'na',
  name: 'Navigation',
  content: 'Navigation',
  css: null,
  link: false,
  links: [],
  style: {
    color: null,
    display: 'block',
    width: null,
    fontFamily: null,
    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    textTransform: null,
    textAlign: 'center',
    padding: null,
    margin: null,
    border: null,
    borderRadius: null,
  },
  cubes: []
}

// export const photo = {
//   name: 'Photo',
//   type: 'ph',
//   init(){
//     return {
//       _id: ObjectId(),
//       type: 'ph',
//       content: 'Photo',
//       css: null,
//       style: {
//         color: null,
//         display: 'block',
//         width: null,
//         fontFamily: null,
//         fontSize: null,
//         fontWeight: null,
//         lineHeight: null,
//         letterSpacing: null,
//         textTransform: null,
//         textAlign: 'center',
//         margin: null
//       }
//     }
//   }
// }

// { name: 'Icon', type: 'icon' },
// { name: 'DataTable', type: 'data-table' },
// { name: 'DataForm', type: 'data-form' },
// { name: 'Timer', type: 'timer' },
// { name: 'Container', type: 'container' },
// { name: 'VideoBox', type: 'video-box' },
// { name: 'AudioBox', type: 'audio-box' },
// { name: 'Card', type: 'card' },
// { name: 'List', type: 'list' },
// { name: 'Grid', type: 'grid' },
// { name: 'Popup', type: 'popup' },
// { name: 'Toolbar', type: 'toolbar' },
// { name: 'Gallery', type: 'gallery' },
// { name: 'ContactForm', type: 'contact-form' },
// { name: 'SocialShare', type: 'social-share' },

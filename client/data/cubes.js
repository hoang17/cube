import _ from 'lodash'

exports.link = {
  name: 'Link',
  tag: 'lnk',
  defaultValue: {
    type: 'lnk',
    name: 'Link',
    content: 'Link 🙌🏻',
    active: false,
    url: '',
    style: {
      color: '',
      display: '',
      width: '',
      fontFamily: '',
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: 'none',
      textAlign: 'center',
      margin: 'auto'
    }
  }
}

let link = exports.link.defaultValue
let link1 = _.cloneDeep(link)
let link2 = _.cloneDeep(link)
let link3 = _.cloneDeep(link)

exports.navigation = {
  name: 'Navigation',
  tag: 'na',
  defaultValue: {
    type: 'na',
    name: 'Navigation',
    content: 'Navigation 🙌🏻',
    active: false,
    cubes: [ link1, link2, link3 ],
    style: {
      color: '',
      display: 'block',
      width: '',
      fontFamily: '',
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: 'none',
      textAlign: 'center'
    }
  }
}

exports.container = {
  name: 'Container',
  tag: 'container',
  defaultValue: {
    type: 'container',
    name: 'Container',
    content: 'Container 🙌🏻',
    active: false,
    cubes: [],
    style: {
      color: '',
      display: 'block',
      width: '',
      fontFamily: '',
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: 'none',
      textAlign: 'center'
    }
  }
}

exports.text = {
  name: 'Text',
  tag: 'tx',
  defaultValue: {
    type: 'tx',
    name: 'Text',
    content: 'New text 🙌🏻',
    active: false,
    style: {
      color: '',
      display: 'block',
      width: '',
      fontFamily: '',
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: 'none',
      textAlign: 'center',
      padding: ''
    }
  }
}

exports.button = {
  name: 'Button',
  tag: 'btn',
  defaultValue: {
    type: 'btn',
    name: 'Button',
    content: 'Button 🙌🏻',
    active: false,
    url: '',
    style: {
      color: '',
      display: '',
      width: '',
      height: '',
      fontFamily: '',
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: 'none',
      textAlign: 'center',
      margin: 'auto'
    }
  }
}

exports.photo = {
  name: 'Photo',
  tag: 'ph',
  defaultValue: {
    type: 'ph',
    content: 'Photo 🙌🏻',
    active: false,
    style: {
      color: '',
      display: 'block',
      width: '',
      fontFamily: '',
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: 'none',
      textAlign: 'center',
      margin: 'auto'
    }
  }
}

// { name: 'Icon', tag: 'icon' },
// { name: 'DataTable', tag: 'data-table' },
// { name: 'DataForm', tag: 'data-form' },
// { name: 'Timer', tag: 'timer' },
// { name: 'Container', tag: 'container' },
// { name: 'VideoBox', tag: 'video-box' },
// { name: 'AudioBox', tag: 'audio-box' },
// { name: 'Card', tag: 'card' },
// { name: 'List', tag: 'list' },
// { name: 'Grid', tag: 'grid' },
// { name: 'Popup', tag: 'popup' },
// { name: 'Toolbar', tag: 'toolbar' },
// { name: 'Gallery', tag: 'gallery' },
// { name: 'ContactForm', tag: 'contact-form' },
// { name: 'SocialShare', tag: 'social-share' },

import _ from 'lodash'

exports.text = {
  name: 'Text',
  tag: 'tx',
  defaultValue: {
    type: 'tx',
    name: 'Text',
    content: 'New text 🙌🏻',
    active: false,
    style: {
      color: null,
      display: 'block',
      width: null,
      fontFamily: null,
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: null,
      textAlign: 'center',
      padding: null
    }
  }
}

exports.link = {
  name: 'Link',
  tag: 'lnk',
  defaultValue: {
    type: 'lnk',
    name: 'Link',
    content: 'Link 🙌🏻',
    active: false,
    url: null,
    style: {
      color: null,
      display: null,
      width: null,
      fontFamily: null,
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: null,
      textAlign: 'center',
      margin: null,
      border: null,
      borderRadius: null,
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
    url: null,
    style: {
      color: null,
      display: null,
      width: null,
      height: null,
      fontFamily: null,
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: null,
      textAlign: 'center',
      margin: null
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
      order: null,
      fontFamily: null,
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: null,
      textAlign: 'center',
      flex: null,
      flexFlow: null
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
      color: null,
      display: 'block',
      width: null,
      fontFamily: null,
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: null,
      textAlign: 'center',
      border: null,
      borderRadius: null,
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
      color: null,
      display: 'block',
      width: null,
      fontFamily: null,
      fontSize: '1em',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0rem',
      textTransform: null,
      textAlign: 'center',
      margin: null
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

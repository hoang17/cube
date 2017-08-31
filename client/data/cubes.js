import _ from 'lodash'

export const text = {
  name: 'Text',
  tag: 'tx',
  props() {
    return {
      type: 'tx',
      name: 'Text',
      content: 'New text 🙌🏻',
      style: {
        color: undefined,
        display: 'block',
        width: undefined,
        fontFamily: undefined,
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        // textTransform: undefined,
        textAlign: 'center',
        padding: undefined,
        margin: undefined,
      }
    }
  }
}

export const link = {
  name: 'Link',
  tag: 'lnk',
  props() {
    return {
      type: 'lnk',
      name: 'Link',
      content: 'Link 🙌🏻',
      url: undefined,
      style: {
        color: undefined,
        display: undefined,
        width: undefined,
        fontFamily: undefined,
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        // textTransform: undefined,
        textAlign: 'center',
        margin: undefined,
        border: undefined,
        borderRadius: undefined,
      }
    }
  }
}

export const button = {
  name: 'Button',
  tag: 'btn',
  props() {
    return {
      type: 'btn',
      name: 'Button',
      content: 'Button 🙌🏻',
      url: undefined,
      style: {
        color: undefined,
        display: undefined,
        width: undefined,
        height: undefined,
        fontFamily: undefined,
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        // textTransform: undefined,
        textAlign: 'center',
        margin: undefined
      }
    }
  }
}

export const container = {
  name: 'Container',
  tag: 'container',
  props() {
    return {
      type: 'container',
      name: 'Container',
      content: 'Container 🙌🏻',
      cubes: [],
      style: {
        color: undefined,
        display: 'block',
        width: undefined,
        height: undefined,
        minWidth: undefined,
        minHeight: undefined,
        maxWidth: undefined,
        maxHeight: undefined,
        padding: undefined,
        margin: undefined,
        background: undefined,
        border: undefined,
        borderRadius: undefined,
        order: undefined,
        fontFamily: undefined,
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        // textTransform: undefined,
        textAlign: 'center',
        flex: undefined,
        flexFlow: undefined
      }
    }
  }
}

export const navigation = {
  name: 'Navigation',
  tag: 'na',
  props() {
    return {
      type: 'na',
      name: 'Navigation',
      content: 'Navigation 🙌🏻',
      cubes: [ link.props(), link.props(), link.props() ],
      style: {
        color: undefined,
        display: 'block',
        width: undefined,
        fontFamily: undefined,
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        // textTransform: undefined,
        textAlign: 'center',
        border: undefined,
        borderRadius: undefined,
      }
    }
  }
}

export const photo = {
  name: 'Photo',
  tag: 'ph',
  props() {
    return {
      type: 'ph',
      content: 'Photo 🙌🏻',
      style: {
        color: undefined,
        display: 'block',
        width: undefined,
        fontFamily: undefined,
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        // textTransform: undefined,
        textAlign: 'center',
        margin: undefined
      }
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

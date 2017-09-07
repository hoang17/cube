
// Cube prototypes

export const text = {
  name: 'Text',
  type: 'tx',
  init(){
    return {
      type: 'tx',
      name: 'Text',
      content: 'New text',
      css: null,
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
  }
}

export const link = {
  name: 'Link',
  type: 'lnk',
  init(){
    return {
      type: 'lnk',
      name: 'Link',
      content: 'Link',
      url: null,
      css: null,
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
  }
}

export const button = {
  name: 'Button',
  type: 'btn',
  init(){
    return {
      type: 'btn',
      name: 'Button',
      content: 'Button',
      url: null,
      css: null,
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
  }
}

export const container = {
  name: 'Container',
  type: 'container',
  init(){
    return {
      type: 'container',
      name: 'Container',
      content: 'Container',
      css: null,
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
  }
}

export const navigation = {
  name: 'Navigation',
  type: 'na',
  init(){
    return {
      type: 'na',
      name: 'Navigation',
      content: 'Navigation',
      css: null,
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
      cubes: [ link.init(), link.init(), link.init()]
    }
  }
}

export const photo = {
  name: 'Photo',
  type: 'ph',
  init(){
    return {
      type: 'ph',
      content: 'Photo',
      css: null,
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
        margin: null
      }
    }
  }
}

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

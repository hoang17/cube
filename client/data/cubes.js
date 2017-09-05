
// Cube prototypes

export const text = {
  name: 'Text',
  tag: 'tx',
  new(){
    return {
      type: 'tx',
      name: 'Text',
      content: 'New text 🙌🏻',
      css: undefined,
      style: {
        color: undefined,
        display: undefined,
        width: undefined,
        fontFamily: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        lineHeight: undefined,
        letterSpacing: undefined,
        textTransform: undefined,
        textAlign: undefined,
        padding: undefined,
        margin: undefined,
      }
    }
  }
}

export const link = {
  name: 'Link',
  tag: 'lnk',
  new(){
    return {
      type: 'lnk',
      name: 'Link',
      content: 'Link 🙌🏻',
      url: undefined,
      css: undefined,
      style: {
        color: undefined,
        display: undefined,
        width: undefined,
        fontFamily: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        lineHeight: undefined,
        letterSpacing: undefined,
        textTransform: undefined,
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
  new(){
    return {
      type: 'btn',
      name: 'Button',
      content: 'Button 🙌🏻',
      url: undefined,
      css: undefined,
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
        textAlign: 'center',
        margin: undefined
      }
    }
  }
}

export const container = {
  name: 'Container',
  tag: 'container',
  new(){
    return {
      type: 'container',
      name: 'Container',
      content: 'Container 🙌🏻',
      css: undefined,
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
        fontSize: undefined,
        fontWeight: undefined,
        lineHeight: undefined,
        letterSpacing: undefined,
        textTransform: undefined,
        textAlign: 'center',
        flex: undefined,
        flexFlow: undefined
      },
      cubes: []
    }
  }
}

export const navigation = {
  name: 'Navigation',
  tag: 'na',
  new(){
    return {
      type: 'na',
      name: 'Navigation',
      content: 'Navigation 🙌🏻',
      css: undefined,
      style: {
        color: undefined,
        display: 'block',
        width: undefined,
        fontFamily: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        lineHeight: undefined,
        letterSpacing: undefined,
        textTransform: undefined,
        textAlign: 'center',
        border: undefined,
        borderRadius: undefined,
      },
      cubes: [ link.new(), link.new(), link.new()]
    }
  }
}

export const photo = {
  name: 'Photo',
  tag: 'ph',
  new(){
    return {
      type: 'ph',
      content: 'Photo 🙌🏻',
      css: undefined,
      style: {
        color: undefined,
        display: 'block',
        width: undefined,
        fontFamily: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        lineHeight: undefined,
        letterSpacing: undefined,
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

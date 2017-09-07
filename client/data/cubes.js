
// Cube prototypes

export const text = {
  name: 'Text',
  type: 'tx',
  new(){
    return {
      type: 'tx',
      name: 'Text',
      content: 'New text',
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
  type: 'lnk',
  new(){
    return {
      type: 'lnk',
      name: 'Link',
      content: 'Link',
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
        padding: undefined,
        margin: undefined,
        border: undefined,
        borderRadius: undefined,
      }
    }
  }
}

export const button = {
  name: 'Button',
  type: 'btn',
  new(){
    return {
      type: 'btn',
      name: 'Button',
      content: 'Button',
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
        padding: undefined,
        margin: undefined,
      }
    }
  }
}

export const container = {
  name: 'Container',
  type: 'container',
  new(){
    return {
      type: 'container',
      name: 'Container',
      content: 'Container',
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
  type: 'na',
  new(){
    return {
      type: 'na',
      name: 'Navigation',
      content: 'Navigation',
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
        padding: undefined,
        margin: undefined,
        border: undefined,
        borderRadius: undefined,
      },
      cubes: [ link.new(), link.new(), link.new()]
    }
  }
}

export const photo = {
  name: 'Photo',
  type: 'ph',
  new(){
    return {
      type: 'ph',
      content: 'Photo',
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
        margin: undefined
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

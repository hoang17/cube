// import { ObjectId } from './factory'

export const text = {
  _id: null,
  type: 'tx',
  name: 'Text',
  content: 'New text',
  css: null,
  link: false,
  uid: null,
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
  _id: null,
  type: 'lk', // lnk
  name: 'Link',
  content: 'Link',
  url: null,
  css: null,
  link: false,
  uid: null,
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
  _id: null,
  type: 'bn', // btn
  name: 'Button',
  content: 'Button',
  url: null,
  css: null,
  link: false,
  uid: null,
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
  _id: null,
  type: 'cn', // container
  name: 'Container',
  content: 'Container',
  css: null,
  link: false,
  uid: null,
  style: {
    color: null,
    width: null,
    height: null,
    fontFamily: null,
    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    textTransform: null,
    textAlign: null,
    padding: null,
    margin: null,
    display: null,
    minWidth: null,
    minHeight: null,
    maxWidth: null,
    maxHeight: null,
    border: null,
    borderRadius: null,
    transform: null,
    background: null,
    flex: null,
    flexFlow: null
  },
  cubes: []
}

// export const photo = {
//   name: 'Photo',
//   type: 'ph',
// }

export const input = {
  _id: null,
  type: 'in',
  name: 'Input',
  content: 'New Input',
  placeholder: 'Enter input...',
  field: 'fieldName',
  required: false,
  css: null,
  link: false,
  uid: null,
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

export const select = {
  _id: null,
  type: 'se',
  name: 'Select',
  content: 'New Select',
  placeholder: 'Select an option...',
  field: 'fieldName',
  required: false,
  options: [
    {value: 'opt-1', name: 'Option One'},
    {value: 'opt-2', name: 'Option Two'},
    {value: 'opt-3', name: 'Option Three'},
  ],
  css: null,
  link: false,
  uid: null,
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

export const check = {
  _id: null,
  type: 'ck',
  name: 'Checkbox',
  content: 'Check all that apply',
  field: 'fieldName',
  required: false,
  options: [
    {value: 'opt-1', name: 'Option One'},
    {value: 'opt-2', name: 'Option Two'},
    {value: 'opt-3', name: 'Option Three'},
  ],
  css: null,
  link: false,
  uid: null,
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

export const radio = {
  _id: null,
  type: 'ra',
  name: 'Radio',
  content: 'Select an option',
  field: 'fieldName',
  required: false,
  options: [
    {value: 'opt-1', name: 'Option One'},
    {value: 'opt-2', name: 'Option Two'},
    {value: 'opt-3', name: 'Option Three'},
  ],
  css: null,
  link: false,
  uid: null,
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

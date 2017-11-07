export const text = {
  _id: null,
  type: 'tx',
  name: 'Text',
  content: 'New text',
  icon: 'fa fa-font',
  uid: null,
  src: null,
  order: 1,
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
    '&:hover': {
      color: null,
      backgroundColor: null,
      borderColor: null
    }
  },
}

export const link = {
  _id: null,
  type: 'lk',
  name: 'Link',
  content: 'Link',
  icon: 'fa fa-link',
  url: null,
  uid: null,
  src: null,
  order: 2,
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
    '&:hover': {
      color: null,
      backgroundColor: null,
      borderColor: null
    }
  }
}

export const button = {
  _id: null,
  type: 'bn',
  name: 'Button',
  content: 'Button',
  icon: 'icon-button',
  url: null,
  uid: null,
  src: null,
  order: 3,
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
    '&:hover': {
      color: null,
      backgroundColor: null,
      borderColor: null
    }
  }
}

export const container = {
  _id: null,
  type: 'cn',
  name: 'Container',
  content: 'Container',
  icon: 'fa fa-th-large',
  uid: null,
  src: null,
  order: 4,
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
    flexFlow: null,
    '&:hover': {
      color: null,
      backgroundColor: null,
      borderColor: null
    }
  },
  cubes: []
}

export const form = {
  _id: null,
  type: 'fm',
  name: 'Form',
  content: 'Form',
  icon: 'fa fa-list-alt',
  uid: null,
  src: null,
  order: 5,
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
    flexFlow: null,
  },
  cubes: [],
}

export const input = {
  _id: null,
  type: 'in',
  name: 'Input',
  content: 'New Input',
  placeholder: 'Enter input...',
  field: 'fieldName',
  required: false,
  icon: 'icon-text',
  uid: null,
  src: null,
  order: 6,
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
  icon: 'icon-select',
  options: [
    {value: 'opt-1', name: 'Option One'},
    {value: 'opt-2', name: 'Option Two'},
    {value: 'opt-3', name: 'Option Three'},
  ],
  uid: null,
  src: null,
  order: 7,
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

export const checkbox = {
  _id: null,
  type: 'ck',
  name: 'Checkbox',
  content: 'Check all that apply',
  field: 'fieldName',
  required: false,
  icon: 'fa fa-check-square-o',
  options: [
    {value: 'opt-1', name: 'Option One'},
    {value: 'opt-2', name: 'Option Two'},
    {value: 'opt-3', name: 'Option Three'},
  ],
  uid: null,
  src: null,
  order: 8,
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
  icon: 'fa fa-dot-circle-o',
  options: [
    {value: 'opt-1', name: 'Option One'},
    {value: 'opt-2', name: 'Option Two'},
    {value: 'opt-3', name: 'Option Three'},
  ],
  uid: null,
  src: null,
  order: 9,
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

export const photo = {
  _id: null,
  type: 'pt',
  name: 'Photo',
  content: 'Photo',
  icon: 'fa fa-photo',
  url: null,
  uid: null,
  src: null,
  order: 10,
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
    '&:hover': {
      color: null,
      backgroundColor: null,
      borderColor: null
    }
  }
}

export const stripeButton = {
  _id: null,
  type: 'stripe-bn',
  name: 'StripeButton',
  content: 'Stripe Button',
  icon: 'icon-button',
  url: null,
  uid: null,
  src: null,
  order: 3,
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
    '&:hover': {
      color: null,
      backgroundColor: null,
      borderColor: null
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

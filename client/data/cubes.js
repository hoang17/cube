exports.cubes = {
  tx: {
    name: 'Text',
    tag: 'tx',
    // fields: {
    //   style: {
    //     name: 'style',
    //     type: 'object',
    //     fields: {
    //       color: {
    //         name: 'color',
    //         type: 'color',
    //       },
    //       display: {
    //         name: 'display',
    //         type: 'select',
    //         range: ['block', 'inline', 'inline-block', 'flex', 'none']
    //       },
    //       width: {
    //         name: 'width',
    //         type: 'pixel',
    //       },
    //       fontFamily: {
    //         name: 'fontFamily',
    //         type: 'font-select',
    //       },
    //       fontSize: {
    //         name: 'fontSize',
    //         type: 'em',
    //         range: [1,10],
    //       },
    //       fontWeight: {
    //         name: 'fontWeight',
    //         type: 'select',
    //         range: ['thin','regular','bold']
    //       },
    //       lineHeight: {
    //         name: 'lineHeight',
    //         type: 'number',
    //         range: [1,5]
    //       },
    //       letterSpacing: {
    //         name: 'width',
    //         type: 'numer',
    //         range: [0,5]
    //       },
    //       textTransform: {
    //         name: 'textTransform',
    //         type: 'select',
    //         range: ['normal','uppercase','lowercase','small caps']
    //       },
    //       textAlign: {
    //         name: 'textAlign',
    //         type: 'select',
    //         range: ['auto','left','center','right','justify']
    //       },
    //     }
    //   },
    // },
    defaultValue: {
      _id: null,
      type: 'tx',
      content: 'New text 🙌🏻',
      active: false,
      style: {
        color: '',
        display: 'block',
        width: '',
        fontFamily: 'Roboto',
        fontSize: '1em',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0rem',
        textTransform: 'none',
        textAlign: 'center'
      }
    }
  },
  btn: {
    name: 'Button',
    tag: 'btn',
    defaultValue: {
      _id: null,
      type: 'btn',
      content: 'New Button 🙌🏻',
      active: false,
      style: {
        color: '',
        display: 'block',
        width: '',
        fontFamily: 'Roboto',
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
}

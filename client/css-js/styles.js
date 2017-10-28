import { lighten, modularScale, hiDPI } from 'polished'

export const wrapper = {
  height: '10em',
  border: '.5vw solid #07c'
}

const cssClass = {
  color: 'red',
  backgroundColor: 'lightblue'
}

const cssA = {
  ...cssClass,
  color: lighten(0.2, '#000'),
  fontSize: modularScale(1),
  [hiDPI(1.5)]: {
    fontSize: modularScale(2.5)
  },
  '&:hover': {
    backgroundColor: 'tomato'
  }
}

const cssB = {
  ...cssA,
  lineHeight: '2em',
  fontSize: modularScale(4),
}

export const cssC = {
  extend: cssB,
  cursor: 'pointer',
  paddingLeft: '5em',
  transition: '.3s cubic-bezier(.25,.8,.5,1)',
  '&:hover': {
    letterSpacing: '1em',
    paddingLeft: '2em',
    lineHeight: '3em',
  }
}

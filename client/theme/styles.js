export const white = '#fff'
export const black = '#111'
export const blue = '#07c'

export const colors = {
  white,
  black,
  blue
}

export const space = [
  0,
  8,
  16,
  32,
  64
]

// Since we’re using JavaScript, we can also employ helper functions for styling elements.
// For example, a function to create rgba values of black can be very handy.
const darken = (n) => `rgba(0, 0, 0, ${n})`

darken(1 / 8) // 'rgba(0, 0, 0, 0.125)'

// Functions like this can then be used to create a value scale array to help keep things consistent.

const shade = [
  darken(0),
  darken(1 / 8),
  darken(1 / 4),
  darken(3 / 8),
  darken(1 / 2),
  darken(5 / 8),
  darken(3 / 4),
  darken(7 / 8),
  darken(1)
]

shade[4] // 'rgba(0, 0, 0, 0.5)'

// Another example would be creating a scale for margin and padding to help keep visual rhythm consistent.

// Modular powers of two scale
const scale = [
  0,
  8,
  16,
  32,
  64
]

// Functions to get partial style objects
const createScaledPropertyGetter = (scale) => (prop) => (x) => {
  return (typeof x === 'number' && typeof scale[x] === 'number')
    ? { [prop]: scale[x] }
    : null
}
const getScaledProperty = createScaledPropertyGetter(scale)

export const getMargin = getScaledProperty('margin')
export const getPadding = getScaledProperty('padding')
// Style function usage
const Box = ({
  m,
  p,
  ...props
}) => {
  const sx = {
    ...getMargin(m),
    ...getPadding(p)
  }

  return <div {...props} style={sx} />
}

// Component usage
// <div>
//   <Box m={2} p={3}>
//     A box with 16px margin and 32px padding
//   </Box>
// </div>

const styles = {
  bold: 600,
  space,
  colors
}

export default styles

// Instead of the darken function above, here is an example using chroma-js’s alpha function.

import chroma from 'chroma-js'

const alpha = (color) => (a) => chroma(color).alpha(a).css()

const darken = alpha('#000')

const shade = [
  darken(0),
  darken(1 / 8),
  darken(1 / 4),
  // ...
]

// Using chroma, this function can work with any color from the style object.

const blueAlpha = [
  alpha(blue)(0),
  alpha(blue)(1 / 4),
  alpha(blue)(1 / 2),
  alpha(blue)(3 / 4),
  alpha(blue)(1)
]

// ** USAGE:
// The style object could store anything related to styling that is shared across components, including borders, border radii, shadows, animation duration, etc.
//
// import { bold, space, colors } from './styles'
//
// const Button = ({
//   ...props
// }) => {
//   const sx = {
//     fontFamily: 'inherit',
//     fontSize: 'inherit',
//     fontWeight: bold,
//     textDecoration: 'none',
//     display: 'inline-block',
//     margin: 0,
//     paddingTop: space[1],
//     paddingBottom: space[1],
//     paddingLeft: space[2],
//     paddingRight: space[2],
//     border: 0,
//     color: colors.white,
//     backgroundColor: colors.blue,
//     WebkitAppearance: 'none',
//     MozAppearance: 'none'
//     boxShadow: `0 0 4px ${shade[1]}`
//   }
//
//   return (
//     <button {...props} style={sx} />
//   )
// }

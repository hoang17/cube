<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC } from './styles'

import { StyleSheet as sheet, css } from 'aphrodite-jss'

// const styles = sheet.create({
//   button: {
//     border: '1px solid',
//     borderRadius: 5,
//     fontSize: 'inherit',
//     lineHeight: '2.3em',
//     padding: '0 1em',
//     boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
//     textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
//     backgroundRepeat: 'repeat-x',
//     color: '#fff',
//     fontWeight: 400,
//     '& span': {
//       marginRight: 5,
//       color: '#fff'
//     }
//   },
//   primary: {
//     borderColor: '#1177cd #0f6ab6 #0d5c9e',
//     backgroundImage: 'linear-gradient(to bottom, #2591ed 0%, #1177cd 100%)',
//     backgroundColor: '#1385e5',
//     '&:hover': {
//       backgroundImage: 'linear-gradient(to bottom, #3c9def 0%, #1385e5 100%)'
//     }
//   }
// })

// const className = css(styles.button, styles.primary)

const styles = { cssC }

const className = css(sheet.create(styles).cssC)

export default {
  data(){
    return {
      className,
    }
  }
}
</script>

<style lang="stylus" module>
</style>

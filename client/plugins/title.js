import insertCss from 'insert-css'
import { genStyle } from './helpers'

function getTitle (vm) {
  const { title } = vm.$options
  if (title)
    return typeof title === 'function' ? title.call(vm) : title
}

const serverTitleMixin = {
  async created () {
    const title = getTitle(this)
    if (title) {

      // await this.$store.dispatch('fetchStyles')

      // this.styles.map(e => {
      //   let s = genStyle(e.style)
      //   let style = `.--${e._id} {${s}}`
      //   console.log(style);
      //   this.$ssrContext.style += style
      // })

      // for (let i in this.styles){
      //   let e = this.styles[i]
      //   let s = genStyle(e.style)
      //   let style = `.--${e._id} {${s}}`
      //   this.$ssrContext.style += style
      // }
      //
      // console.log(this.$ssrContext.style);

      // this.$ssrContext.title = title
      this.$ssrContext.title = `${title} - Cube`
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title)
      // document.title = title
      document.title = `${title} - Cube`
  }
}

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin

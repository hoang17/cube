function getTitle (vm) {
  const { title } = vm.$options
  if (title)
    return typeof title === 'function' ? title.call(vm) : title
}

const serverTitleMixin = {
  async created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = `${title} - Cube`
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title)
      document.title = `${title} - Cube`
  }
}

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin

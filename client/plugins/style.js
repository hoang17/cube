function getRules(vm) {
  const { rules } = vm.$options
  if (rules)
    return typeof rules === 'function' ? rules.call(vm) : rules
}

const serverStyleMixin = {
  async created () {
    const rules = getRules(this)
    if (rules) {
      // log(rules);
      this.$ssrContext.style += rules
    }
  }
}

const clientStyleMixin = {
  mounted () {
    // const rules = getRules(this)
    // if (rules)
    //   document.rules = rules
  }
}

export default process.env.VUE_ENV === 'server' ? serverStyleMixin : clientStyleMixin

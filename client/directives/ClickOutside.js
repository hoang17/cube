export default {
  bind: function(el, binding, vNode) {
    // // Provided expression must evaluate to a function.
    // if (typeof binding.value !== 'function') {
    // 	const compName = vNode.context.name
    //   let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
    //   if (compName) { warn += `Found in component '${compName}'` }
    //
    //   console.warn(warn)
    // }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },
  unbind: function(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
}

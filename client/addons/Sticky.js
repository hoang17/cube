export default {
  inserted(el, binding) {
    // console.log('inserted')
    // const val = binding.value
    // if (val) {
    //   if (val.marginTop) el.setAttribute('data-margin-top', val.marginTop)
    //   if (val.stickyFor) el.setAttribute('data-sticky-for', val.stickyFor)
    //   if (val.stickyClass) el.setAttribute('data-sticky-class', val.stickyClass)
    // }
    // // el.parentElement.setAttribute('data-sticky-container', '')
    // el.className += ' sticky'
    // new Sticky('.sticky')
    sticky(el)
  },
    // update(el, binding) {
    // console.log('update')
    // if (binding.oldValue && binding.oldValue.stickyClass == binding.value.stickyClass) return
    // const val = binding.value
    // if (val) {
    //   if (val.marginTop) el.setAttribute('data-margin-top', val.marginTop)
    //   if (val.forName) el.setAttribute('data-sticky-for', val.forName)
    //   if (val.className) el.setAttribute('data-sticky-class', val.className)
    // }
    // new Sticky('.sticky')
    // sticky(el)
    // }
}

function sticky(el, top, options) {

  var requiredOriginalStyles = ['position', 'top', 'left', 'z-index']

  var requiredTop = top || 0
  var originalRect = calcRect(el)

  if (originalRect.width == 0) return

  var styles = {
    position: 'fixed',
    top: requiredTop + 'px',
    left: originalRect.left + 'px',
    width: originalRect.width + 'px',
    'z-index': 9999
  }

  if(options && options.enforceWidth) {
    styles.width = originalRect.width + 'px'
  }

  var originalStyles = {}
  requiredOriginalStyles.forEach(function(key) {
    originalStyles[key] = el.style[key]
  });

  var onscroll;
  if (window.onscroll) {
    onscroll = window.onscroll
  }

  window.onscroll = function(event) {
    if (getWindowScroll().top > originalRect.top - requiredTop) {
      for (var key in styles) {
        el.style[key] = styles[key]
      }
    } else {
      for (var key in originalStyles) {
        el.style[key] = originalStyles[key]
      }
    }
    onscroll && onscroll(event)
  }
}

function calcRect(el) {
  var rect = el.getBoundingClientRect();
  var windowScroll = getWindowScroll()
  return {
    left: rect.left + windowScroll.left,
    top: rect.top + windowScroll.top,
    width: rect.width,
    height: rect.height
  }
}

function getWindowScroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop,
    left: window.pageXOffset || document.documentElement.scrollLeft
  }
}

const getRect = function(el) {
  let offsetTop = 0
  let offsetHeight = el.offsetHeight
  while (el) {
    offsetTop += el.offsetTop
    el = el.offsetParent
  }
  let top = offsetTop - window.pageYOffset
  return {
    top: top,
    bottom: top + offsetHeight
  }
}

module.exports = function() {
  return {
    mounted: function() {
      let prev = {
        top: false,
        bottom: false
      }
      this.vuesibleCallback = (function(_this) {
        return function() {

          let rect = getRect(_this.$el)

          // top = rect.top > 0 && rect.top < window.innerHeight;
          // bottom = rect.bottom > 0 && rect.bottom < window.innerHeight;
          // inner = rect.top <= 0 && rect.bottom >= window.innerHeight;
          // fully = (top && bottom) || inner;
          // partially = (top !== bottom) && !inner;
          // fullyOrPartially = top || bottom || inner;

          let topCenter = rect.top < window.innerHeight / 2
          let bottomCenter = rect.bottom > window.innerHeight / 2
          let center = topCenter && bottomCenter

          let current = {
            // top: top,
            // bottom: bottom,
            // inner: inner,
            // fully: fully,
            // partially: partially,
            // fullyOrPartially: fullyOrPartially,
            center: center
          };
          // percentVisible = 0;
          // distanceToScreenCenter = {
          //   top: window.innerHeight / 2 - rect.top,
          //   center: window.innerHeight / 2 - (rect.bottom - rect.top),
          //   bottom: window.innerHeight / 2 - rect.bottom
          // };
          // overlapCenter = rect.top <= (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2);
          // lowerThenCenter = rect.top > (window.innerHeight / 2);
          // let state = {
          //   percentVisible: percentVisible,
          //   distanceToScreenCenter: distanceToScreenCenter,
          //   overlapCenter: overlapCenter,
          //   lowerThenCenter: lowerThenCenter
          // };
          // _this.$emit('visible-temp', state);

          if (!prev.center && current.center) {
            _this.$emit('center-appeared')
          }

          // if (!prev.top && current.top) {
          //   _this.$emit('top-edge-appeared');
          // }
          // if (prev.top && !current.top) {
          //   _this.$emit('top-edge-disappeared');
          // }
          // if (!prev.bottom && current.bottom) {
          //   _this.$emit('bottom-edge-appeared');
          // }
          // if (prev.bottom && !current.bottom) {
          //   _this.$emit('bottom-edge-disappeared');
          // }
          // if (!prev.fullyOrPartially && current.fullyOrPartially) {
          //   _this.$emit('appeared');
          // }
          // if (!prev.fully && current.fully) {
          //   _this.$emit('fully-appeared');
          // }
          // if (prev.fullyOrPartially && !current.fullyOrPartially) {
          //   _this.$emit('disappeared');
          // }
          // if (prev.fully && !current.fully) {
          //   _this.$emit('partially-disappeared');
          // }
          return prev = current
        };
      })(this);
      return document.addEventListener('scroll', this.vuesibleCallback, true)
    },
    beforeDestroy: function() {
      return document.removeEventListener('scroll', this.vuesibleCallback)
    }
  };
};

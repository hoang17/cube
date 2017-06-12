<!-- borrowed from Nuxt! -->

<template>
  <div>
    <div class="progress" :style="{
      'width': percent+'%',
      'height': height,
      'background-color': canSuccess? color : failedColor,
      'opacity': show ? 1 : 0 }"></div>
    <!-- <spinner :show="show"></spinner> -->
  </div>
</template>

<script>
// import Spinner from './Spinner.vue'

export default {
  // components: {
  //   'spinner': Spinner
  // },
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 3000,
      height: '2px',
      color: '#29d',
      failedColor: '#ff0000',
    }
  },
  methods: {
    start () {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.percent > 95) {
          this.finish()
        }
      }, 100)
      return this
    },
    set (num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get () {
      return Math.floor(this.percent)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    decrease (num) {
      this.percent = this.percent - Math.floor(num)
      return this
    },
    finish () {
      this.percent = 100
      this.hide()
      return this
    },
    pause () {
      clearInterval(this._timer)
      return this
    },
    hide () {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail () {
      this.canSuccess = false
      return this
    }
  }
}
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #29d;
  z-index: 999999;

  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  /*box-shadow: 0 0 10px #efc14e, 0 0 5px #efc14e;*/

  /*-webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);*/

}
</style>

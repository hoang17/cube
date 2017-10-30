import { css } from '../css-js/stylish'

const cssMixin = {
  computed: {
    active(){
      return this.$store.state.activeCube == this.cube
    },
    cubeCss(){
      return this.cube.src ? css(this.src.style, 's'+this.cube.src) : css(this.cube.style, 'c'+this.cube._id)
    },
    src(){
      return this.$store.state.cubes[this.cube.src]
    },
  }
}

export default cssMixin

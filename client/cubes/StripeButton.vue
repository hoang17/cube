<template lang="pug">
  div(
    :edit="edit"
    :active="active"
    :class="css"
    @click.stop="onClick"
    @mouseover.stop="")
    div(:class="$style.amount") {{ cube.content }}
    button(type="submit" @click.prevent="checkout" :class="$style.stripeButton")
      span {{ cube.label }}
</template>

<script>
import cssMixin from '../mixins/css'

export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
  computed: {
    css(){
      return [
        this.$style.button,
        this.cubeCss,
      ]
    },
  },
  mounted() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_QMK3N95W3aCt9eydN1zUzFE8',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        console.log(token);
        this.$store.dispatch('stripeSubscribe', { token: token.id, email: token.email, handle: this.cube.handle })
      }
    })
  },
  methods: {
    checkout(){
      this.handler.open({
        name: 'Cube',
        amount: parseInt(this.cube.amount),
        panelLabel: this.cube.panelLabel,
        description: this.cube.description,
      })
    },
    onClick(){
      if (this.edit)
        this.select(this.cube, this.$el, this.parent)
      // else
      //   this.$store.dispatch('stripeSubscribe', {plan_id: 1})
    },
  },
}
</script>

<style lang="stylus" module>
.amount
  margin-bottom 10px

.button
  composes cube from "./cube.css"
  outline none
  background-color #f5f5f5
  display inline-block
  border none
  padding .6em 1.7em
  &[edit]
    cursor pointer

.stripeButton
  overflow: hidden
  display: inline-block
  visibility: visible !important
  background-image: linear-gradient(#28a0e5,#015e94)
  -webkit-font-smoothing: antialiased
  border: 0
  padding: 1px
  text-decoration: none
  border-radius: 5px
  box-shadow: 0 1px 0 rgba(0,0,0,0.2)
  user-select: none
  cursor: pointer

  span
    display: block
    min-height: 30px
    position: relative
    padding: 0 12px
    height: 30px
    line-height: 30px
    background: #1275ff
    background-image: linear-gradient(#7dc5ee,#008cdd 85%,#30a2e4)
    font-size: 14px
    color: #fff
    font-weight: bold
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif
    text-shadow: 0 -1px 0 rgba(0,0,0,0.25)
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25)
    border-radius: 4px
</style>

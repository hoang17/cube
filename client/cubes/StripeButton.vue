<template lang="pug">
  div(
    :edit="edit"
    :active="active"
    :class="css"
    @click.stop="onClick"
    @mouseover.stop="")
    form(:action="cube.url", method="post")
      div(:class="$style.amount") {{ cube.content }}
      input(type='hidden' name='handle' :value="cube.handle")
      script(
        src="//checkout.stripe.com/checkout.js"
        class="stripe-button"
        data-name="Cube"
        data-key="pk_test_QMK3N95W3aCt9eydN1zUzFE8"
        data-locale="auto"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        :data-amount="cube.amount"
        :data-label="cube.label"
        :data-panel-label="cube.panelLabel"
        :data-description="cube.description")
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
  methods: {
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
</style>

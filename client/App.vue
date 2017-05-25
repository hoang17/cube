<template lang="pug">
  #app
    header.header
      nav.inner
        a(href='/')

    //- img(src="./logo.png")
    //- h1 {{ message.label }}
    //- vue-select(v-model="message", :options="options")

    //- h2 {{ date }}
    //- p
    //-   | Format options:
    //-   br
    //-   select(v-model="dateFormat")
    //-     option(value='mm/dd/yy') Default - mm/dd/yy
    //-     option(value='yy-mm-dd') ISO 8601 - yy-mm-dd
    //-     option(value='d M, y') Short - d M, y
    //-     option(value='d MM, y') Medium - d MM, y
    //-     option(value='DD, d MM, yy') Full - DD, d MM, yy
    //-     option(value="'day' d 'of' MM 'in the year' yy") With text - 'day' d 'of' MM 'in the year' yy
    //-
    //- date-picker(:date="date", :date-format='dateFormat', @update-date="updateDate")

    router-view.view
</template>

<script>
// import Vue from 'vue'
// import VueSelect from "vue-select"

// Vue.component('date-picker', {
//   template: '<input v-model="date"/>',
//   props: [ 'date', 'dateFormat' ],
//   watch: {
//     dateFormat: function (val) {
//       $(this.$el).datepicker( "option", "dateFormat", val);
//       this.$emit('update-date', $(this.$el).val())
//     },
//   },
//   mounted: function() {
//     var self = this;
//     $(this.$el).datepicker({
//       dateFormat: this.dateFormat,
//       onSelect: function(date) {
//         self.$emit('update-date', date)
//       }
//     })
//   },
//   beforeDestroy: function() {
//     $(this.$el).datepicker('hide').datepicker('destroy');
//   }
// });

export default {
  name: 'app',
  components: {
    // 'vue-select': VueSelect
  },
  data() {
    return {
      // message: { value: 'one', label: 'One' },
      // options: [
      //   { value: 'one', label: 'One' },
      //   { value: 'two', label: 'Two' }
      // ],
      // date: $.datepicker.formatDate('yy-mm-dd', new Date()),
      // dateFormat: 'yy-mm-dd'
    }
  },
  methods: {
    // updateDate: function(date) {
    //   this.date = date
    // }
  }
}
</script>

<style lang="stylus">
body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 55px
  color #34495e
  overflow-y scroll

a
  &:hover
  &:active
  &:focus
    text-decoration none
    color #34495e
.disabled
    cursor:default

.header
  background-color #ff6600
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>

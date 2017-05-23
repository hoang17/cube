<template lang="pug">
  #app
    img(src="./logo.png")
    h1 {{ message.label }}
    h2 {{ date }}
    vue-select(v-model="message", :options="options")

    p
      | Format options:
      br
      select(v-model="dateFormat")
        option(value='mm/dd/yy') Default - mm/dd/yy
        option(value='yy-mm-dd') ISO 8601 - yy-mm-dd
        option(value='d M, y') Short - d M, y
        option(value='d MM, y') Medium - d MM, y
        option(value='DD, d MM, yy') Full - DD, d MM, yy
        option(value="'day' d 'of' MM 'in the year' yy") With text - 'day' d 'of' MM 'in the year' yy

    date-picker(:date="date", :date-format='dateFormat', @update-date="updateDate")
    router-view
</template>

<script>
import Vue from 'vue'
import VueSelect from "vue-select"

Vue.component('date-picker', {
  template: '<input v-model="date"/>',
  props: [ 'date', 'dateFormat' ],
  watch: {
    dateFormat: function (val) {
      $(this.$el).datepicker( "option", "dateFormat", val);
      this.$emit('update-date', $(this.$el).val())
    },
  },
  mounted: function() {
    var self = this;
    $(this.$el).datepicker({
      dateFormat: this.dateFormat,
      onSelect: function(date) {
        self.$emit('update-date', date)
      }
    })
  },
  beforeDestroy: function() {
    $(this.$el).datepicker('hide').datepicker('destroy');
  }
});


export default {
  name: 'app',
  components: {
    'vue-select': VueSelect
  },
  data() {
    return {
      message: { value: 'one', label: 'One' },
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ],
      date: $.datepicker.formatDate('yy-mm-dd', new Date()),
      dateFormat: 'yy-mm-dd'
    }
  },
  methods: {
    updateDate: function(date) {
      this.date = date
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  text-align center
  margin-top 60px
</style>

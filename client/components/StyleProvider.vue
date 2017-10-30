<template>
  <style>{{styleString}}</style>
</template>

<script>
import { toString } from '../css-js/stylish'
export default {
  computed: {
    styleString: toString
  }
}
</script>

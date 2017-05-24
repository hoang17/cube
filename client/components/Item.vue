<template lang="pug">
  .item
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'Item',
  data () {
    return {
      msg: 'Item'
    }
  }
}
</script>

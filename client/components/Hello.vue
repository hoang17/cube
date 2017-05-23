<template lang="pug">
  .hello
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Hello!'
    }
  }
}
</script>

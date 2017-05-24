<template lang="pug">
  .home
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome home :D!'
    }
  }
}
</script>

<template lang="pug">
  v-app
    transition(name='fade', mode='out-in')
      router-view
      //-keep-alive(include="groups,likes,pages")
        router-view.view
</template>

<script>
export default {
  name: 'app'
}
</script>

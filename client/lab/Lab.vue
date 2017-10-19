<template lang="pug">
  .build
    Toolbar(:pl="pl", :pr="pr")
    Navbar(:w="pl")
    Sidebar(:w="pr")
    Canvas(:pl="pl", :pr="pr")
</template>

<script>
export default {
  components: {
    Toolbar,
    Navbar,
    Sidebar,
    Canvas
  },
  data(){
    return {
      pl: "300px",
      pr: "28em"
    }
  }
}
</script>

<style lang="stylus" module>
</style>

<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    input(type="file" @change="upload" ref="up")
    //- Input(
      :ph="ph"
      type="text"
      :readonly="readonly"
      :value="value"
      @input="val => $emit('input', val)"
      @change.native="e => $emit('change', e.target.value)")
</template>

<script>
import Box from './Box'
import Input from './Input'
import Label from './Label'
import { upload } from '../plugins/firebase'
export default {
  props: ['w','lb','ph','value','readonly'],
  components: {
    Box,
    Input,
    Label,
  },
  methods: {
    async upload(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return
      const snapshot = await upload(files[0])
      this.$refs.up.value = ''
      // console.log(snapshot);
      const url = snapshot.metadata.downloadURLs[0]
      if (url)
        this.$emit('input', url)
    }
  }
}
</script>

<style lang="stylus" module>
</style>

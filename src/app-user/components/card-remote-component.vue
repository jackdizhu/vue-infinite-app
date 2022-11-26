<template>
  <div>
    card
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created() {
    console.log('-- created --')
  },
  activated() {
    console.log('-- created --', this)
  },
  mounted() {
    console.log('-- created --')
  },
  destroyed() {
    console.log('-- created --')
  },
}
</script>

<style>

</style>
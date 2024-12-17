<template>
  <h1>{{  appTitle }}</h1>
  <button @click="changeTitle">변경</button>
</template>

<script>
export default {
  props: ['appTitle'],
  emits: ['change'],
  methods: {
    changeTitle() {
      this.$emit('change');
    }
  }
}
</script>

<style>

</style>
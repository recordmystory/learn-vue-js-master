<!-- HTML 영역 -->
<template>
  <!-- 'AppHeader' 대소문자를 정확히 맞추어 사용 -->
  <div>
    <AppHeader v-bind:appTitle="message" v-on:change="changeMsg"></AppHeader>
  </div>
  <div>
    <button @click="showAlert">경고</button>
  </div>
</template>

<!-- JS 영역 -->
<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      message: '앱 헤더 컴포넌트'
    }
  },
  methods: {
    showAlert() {
      alert('hi');
    },
    changeMsg() {
      this.message = '변경'
    }
  }
} 
</script>

<!-- CSS 영역 -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

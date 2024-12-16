<!-- HTML 영역 -->
<template>
  <Appheader></Appheader>
  <div>
    {{ message }}
  </div>
  <button @click="showAlert">경고</button>
</template>

<!-- JS 영역 -->
<script>
// import 라이브러리 from '라이브러리명'
// import 파일이름 from './파일 경로'
import AppHeader from './components/AppHeader.vue';

export default {
  // 인스턴스 옵션 속성
  name: 'App',
  components: {
    Appheader
  },
  methods: {
    showAlert() {
      alert('hi');
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

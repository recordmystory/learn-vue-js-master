<!-- 
 
[ 간단한 로그인 화면 만들기 ]
 - 아이디와 패스워드 입력받기
 - 로그인 버트 클릭시 서버로 요청 보내기

 v-model : 사용 예시) input box에 있는 데이터를 그대로 vue의 데이터에 엮고싶을 때 사용할 수 있음
 -->
 
 <template>
  <form action="" @submit.prevent="submitForm"> <!-- 이벤트 기본동작 막기 -->
    <div>
      <label for="userId">ID : </label>
      <input id="userId" type="text" v-model="username"> <!-- v-model: 인풋에 들어간 데이터를 밑에 username과 연결 -->
    </div>
    <div>
      <label for="password">PW : </label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      submitForm(/** evt **/) { // form 태그내에 사용한 디렉티브로 인해 해당 이벤트를 받을 수 있음
        // evt.preventDefault();
        
        const data = { username: this.username, password: this.password }; // Vue의 데이터 
        axios.post('https://jsonplaceholder.typicode.com/users'/**  {
          // username: this.username,
          // password: this.password
          
        } **/, data)
        .then(response => {
          console.log(response);
        });
        
        // console.log('제출');
      }
    }
  }
</script>

<style scoped>

</style>
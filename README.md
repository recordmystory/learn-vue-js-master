# Vue3 공부

### Reactivity
- Reactivity란

  객체의 내용이 변함에 따라 화면에 내용도 같이 변경됨

- 참고용 코드<br>
```javascript
 function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

## Proxy

```html
<div id="app"></div>

<script>
    let data = {
        a: 10
    }

    let app = new Proxy(data, { // app의 내용이 바뀌게 되면 data의 내용도 같이 바뀜
        get() {
            console.log('값 접근');
        },
        set() {
            console.log('값 갱신');
        }
    })
</script>
```


- DOM API : HTML 태그 정보를 접근할 수 있는 기능
- 렌더링 : 화면에 무언가를 표시하는 행위

- 리액티비티
    
    객체의 내용이 변함에 따라 화면에 내용도 같이 변경됨
    
    ```html
    <div id="app">
        <!-- 해당 태그에 무언가 렌더링 될 예정 -->
    </div>
    
    <script>
        let data = {
            message: 10
        }
        
        function render(sth){
            document.querySelector('#app').innerHTML = sth;
        }
    
        let app = new Proxy(data, { // app의 내용이 바뀌게 되면 data의 내용도 같이 바뀜
            get() {
                console.log('값 접근');
            },
            set(target, prop, newValue) {
                console.log('값 갱신');
                target[prop] = newValue;
                render(newValue);
            }
        })
    </script>
    ```
    

## 리액티비티 차이점

- Vue2 & Vue3

## Vue Methods

- 옵션 API ( == 컴포넌트 옵션 속성, 인스턴스 옵션 속성 )
    
    인스턴스 안에 들어가있는 속성들
    

- methods를 이용해 버튼 클릭 시 숫자 증가
    
    v-on:click 사용
    
    ```html
    <div id="app">
        <p>{{ cnt }}</p>
        <button v-on:click="addCnt">+</button> <!-- 디렉티브 -->
    </div>
    
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
    	Vue.createApp({
    		data() {
    			return { cnt: 0 }
    		},
    		methods: {
    			addCnt() { this.cnt++ }
    		}
    	}).mount('#app')
    </script>
    
    ```
    

## Vue Directive

- v-for
    
    ```html
    <div id="app">
        <ul>
            <li v-for="item in items">{{ item }}</li>
        </ul>
    </div>
    
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            data() {
                return {
                    items: ['삼성', '네이버', '배민']
                }
            }
        }).mount('#app'); // mount : 생성한 인스턴스를 어느 태그에 적용할건지
    </script>
    ```


## 컴포넌트란

컴포넌트란 화면의 영역을 구분하여 개발할 수 있는 뷰의 기능이다. 컴포넌트 기반으로 화면을 개발하게 되면 코드의 재사용이 올라가고 빠르게 화면 제작이 가능하다.

### 컴포넌트 등록

컴포넌트 등록할때마다 Root 컴포넌트 밑에 쌓이게 됨

### 컴포넌트 통신 방식

상위 컴포넌트 → 하위 컴포넌트 : 데이터(props)는 위에서 아래로 흐름

하위 컴포넌트 → 상위 컴포넌트 : 이벤트 발생 (여기서 이벤트란 컴포넌트 간 메시지를 주고 받기 위한 하나의 장치)

### Vue Componenet Props

프롭스 속성은 컴포넌트 간 데이터를 전달할 수 있는 컴포넌트 통신 방법이다.

```jsx
<div id="app">
     <!-- <app-header v-bind:프롭스이름="상위컴포넌트의 데이터이름"></app-header> -->
    <app-header v-bind:title="appTitle"></app-header>
    </div>
    
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            data() {
                return {
                    appTitle: 'props 넘기기'
                }
            },
            components: {
                'app-header': {
                    template: '<h1>{{ title }}</h1>',
                    props: ['title']
                }
            },
        }).mount('#app');
    </script>
```

### Event Emit 소개

하위 컴포넌트에서 상위 컴포넌트로 통신하는 방식

```jsx
<div id="app">
    <!-- <app-contents v-on:이벤트명="상위 컴포넌트의 메서드 이름"></app-contents> -->
     <app-contents v-on:refresh="showAlert"></app-contents>
</div>
   
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
    var appContents = {
        'template': `
        <p>
            <button v-on:click="sendEvent">갱신</button>
        </p>
        `,
        methods: {
            sendEvent() {
                this.$emit('refresh'); // 하위 컴포넌트에서 상위 컴포넌트로 쏘아올림
            }
        }
    }

    // 루트 컴포넌트
    Vue.createApp({
        methods: {
            showAlert() {
                alert('새로고침');
            }
        },
        components: {
            // '컴포넌트 이름': 컴포넌트 내용
            'app-contents': appContents
        }
    }).mount('#app');
</script>
```

### 같은 레벨의 컴포넌트간 데이터 전달 방법
=> same-componenet-level.html

 로그인 버튼을 누를 때 app-header의 내용이 바뀌도록 코딩
 태그간 신호를 보내서 텍스트 변경

 appContents 에서 Root로 이벤트 올리기 → 거기서 바뀐 데이터를 appHeader로 흘려보냄 : 삼각형 구조 생각하기
 루트로 이벤트를 올리는 이유 : 같은 레벨 컴포넌트끼리 직접적으로 통신할 수 없기 때문에

### 템플릿 문법 소개
=> data-binding.html , class-styling.html

- 데이터 바인딩
    
    뷰 인스턴스에서 정의한 속성들을 화면에 표시하는 방법
    
    가장 기본적인 방식은 콧수염 괄호 ⇒ {{ msg }}
    

- 디렉티브
    
    화면 조작을 쉽게 하기 위한 문법 ( v-xx ) : 실무에서는 축약형으로 태그 어트리뷰트 오는 부분에 :xxx 이런식으로 작성한다함

### 싱글 파일 컴포넌트

HTML, CSS, JS 코드를 한 파일에서 관리하는 방법

Vue 확장자를 가진 파일을 모두 싱글 파일 컵포넌트라 함
    
    ex)
    
    v-bind
    
    v-on
    
    v-model
    
    v-if
    
    v-show

- v-model
    
    사용 예시 : input box에 있는 데이터를 그대로 vue의 데이터에 엮고싶을 때 사용할 수 있음
    
- @submit
    
    ```html
    <form @submit="이벤트명">
    	<!-- ............
    			...........
    			..........
    	-->
    </form>
    ```
    
    v-on:submit을 축약해서 사용 가능함
    

- axios 라이브러리 설치 참고

https://github.com/axios/axios

- JSONPlaceholder
    
    서버쪽으로 보내고 받는 동작을 해보고 싶을 때 간단하게 사용할 수 있는 라이브러리
    
    [JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)

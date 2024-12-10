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

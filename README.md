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
    

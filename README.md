# myprocode

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


//核心代码  qrcode  
 qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: 'Eirice',
        render: 'canvas',
        background: '#ace'
      })
 //three.js 登录界面---src-components---logingTest.vue       
//three.js 已经移除canvas渲染 使用以下代码
 renderer = new THREE.WebGLRenderer()
 renderer.setClearColor(0x08f7f4, 0.5)

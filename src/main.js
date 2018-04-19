import Vue from 'vue'
import App from './App'

// 全局样式
import './assets/styles/global.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

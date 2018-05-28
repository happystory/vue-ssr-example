<template>
  <div id="app">
    <v-header />
    <v-footer />
    <todo></todo>
    <div id="cover"></div>
  </div>
</template>

<script>
import Header from './views/layout/header'
import Footer from './views/layout/footer'
import Todo from './views/todo/todo'

export default {
  components: {
    'v-header': Header,
    'v-footer': Footer,
    Todo
  },
  data () {
    return {
      text: 'ab33c'
    }
  }
}
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  #cover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #555
    opacity 0.5
    z-index -1
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <span @click="loadSubApp('appConf', '/app-conf/page01')">加载 appConf应用</span> |
      <span @click="loadSubApp('appUser', '/app-user/page01')">加载 appUser应用</span> |
      <span @click="loadSubApp('XXXX')">加载 XXXX应用</span>
    </div>
    <router-view/>
  </div>
</template>
<script>
import {loadSubAppByName} from './config/index'


export default {
  methods: {
    /**
     * 加载子应用
     */
    loadSubApp (name, defRoute) {
      loadSubAppByName(name).then(res => {
        const routerPromise = res.default
        routerPromise.then((list) => {
          let $list = (list && list.default) || list
          console.log('$list --', $list)
          this.$router.addRoutes($list)
          if (defRoute) {
            this.$router.push(defRoute)
          }
        })
        console.log('loadSubAppByName --', res)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

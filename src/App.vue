<template>
  <div id="app">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view/>
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav'
import { mapGetters } from 'vuex'
export default {
  components: {
    SiteNav
  },
  computed: {
    ...mapGetters({
      userProfile: 'users/user'
    }),
    showNav: function () {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <v-app id="app" dark toolbar>
    <v-toolbar fixed dark>
      <v-toolbar-title>
        <strong>after</strong>hrs</v-toolbar-title>
    </v-toolbar>
    <main>
      
        
        
        
        <router-view></router-view>
        
        
        
      
          <v-bottom-nav v-if="loggedIn" fixed dark :value="true" :active.sync="e1" class="elevaton-10 grey darken-4">
            <div v-for="item in items">
              <router-link :to="item.routerLink">
                <v-btn flat value="item.title">
                  <span>{{item.title}}</span>
                  <v-icon>{{item.icon}}</v-icon>
                </v-btn>
              </router-link>
            </div>
          </v-bottom-nav>
    </main>
  </v-app>
</template>

<script>
  import Profile from './components/Profile'
  import Alcohol from './components/Alcohol'

  export default {
    components: {
      Profile,
      Alcohol
    },
    mounted() {
      this.$store.dispatch('authenticate')
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      }
    },
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        e1: 'Me',
        items: [
          { icon: 'person_pin', title: 'Me', routerLink: '/' },
          { icon: 'local_bar', title: 'Drinks', routerLink: '/Alcohol' },
          { icon: 'group', title: 'Friends', routerLink: '/Friends' },
          { icon: 'mail', title: 'Messaging', routerLink: '/Alcohol' },
          // { icon: 'weekend', title: 'Party', routerLink: '/Alcohol' },
          // { icon: 'settings', title: 'Settings', routerLink: '/Alcohol' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }

</script>
<style>
  * {
    text-decoration: none !important;
  }

  * strong {
    font-weight: 700 !important;
    color: #c2185b;
  }

  #app {
    background-position: fixed !important;
    background-size: cover !important;
    overflow-y: scroll !important;
    -webkit-scrollbar-width: 0;
  }

  #app::-webkit-scrollbar {
    display: none;
  }
</style>

<style lang="stylus">
  @import './stylus/main'
</style>
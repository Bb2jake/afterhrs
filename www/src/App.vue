<template>
  <v-app id="app" dark toolbar>
    <v-navigation-drawer v-if="loggedIn" temporary v-model="drawer" dark overflow fixed>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://i.imgur.com/MRc9ibg.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Current User</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <div v-for="item in items" :key="item.title">
          <router-link :to="item.routerLink">
            <v-list-tile @click="" class="no-underline">
              <v-list-tile-action>
                <v-icon class="no-underline">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark>
      <v-toolbar-side-icon v-if="loggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><strong>after</strong>hrs</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>



        <router-view></router-view>



      </v-container>
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
        items: [
          { icon: 'person_pin', title: 'Me', routerLink: '/' },
          { icon: 'local_bar', title: 'My Bars & Alcohol', routerLink: '/Alcohol' },
          { icon: 'group', title: 'Friends', routerLink: '/Friends' },
          { icon: 'mail', title: 'Messages', routerLink: '/Alcohol' },
          { icon: 'weekend', title: 'Party', routerLink: '/Alcohol' },
          { icon: 'settings', title: 'Settings', routerLink: '/Alcohol' }
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
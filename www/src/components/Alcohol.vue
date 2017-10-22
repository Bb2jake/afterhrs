<template>
  <div>
    <div class="row text-center">


      <v-flex xs12 sm6>
        <v-card dark class="zoomIn white--text mb-3 elevation-24">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <form v-on:submit.prevent="searchDrinks">
                  <v-text-field type="text" placeholder="Search for a drink..." v-model="query"></v-text-field>
                  <v-btn class="btn" type="submit">Search</v-btn>
                </form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      


      <v-layout row wrap class="result-display">
        <v-flex xs12 sm6>
        <v-flex xs12 v-for="result in results">
          <v-card dark class="zoomIn white--text mb-3 elevation-24" transition="slide-y-transition">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <h4>{{ result.name }}</h4>
                    <v-btn class="btn" small @click.prevent="addToMyDrinks(result)">Add To My Drinks</v-btn>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media :src="`http://assets.absolutdrinks.com/drinks/transparent-background-white/soft-shadow/floor-reflection/100x200/${result.id}.png`"
                    height="100px" contain></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        </v-flex>
      </v-layout>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'alcohol',
    data() {
      return {
        query: ''
      }
    },
    computed: {
      results() {
        return Object.freeze(this.$store.state.results)
        console.log(Object.Freeze(this.$store.state.results))
      },
      resultImgUrl() {
        return this.$store.state.resultImgUrl
        console.log(this.$store.state.resultImgUrl)
      }
    },
    methods: {
      searchDrinks() {
        this.$store.dispatch('clearResults');
        this.$store.dispatch('search', this.query.replace(/\s+/g, '-').toLowerCase());
      },
      addToMyDrinks(drink) {
        var user = this.$store.state.activeUser;
        delete user.password
        user.drinks.push(drink)
        this.$store.dispatch("updateUser", user);
      }
    },
  }

</script>
<style>
  /* .result-display {
    height: 50vh;
    overflow: hidden;
    overflow-y: scroll !important;
    -webkit-scrollbar-width: 0px;
  } */

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    50% {
      opacity: 1;
    }
  }

  .zoomIn {
    animation-name: zoomIn;
    animation-duration: 500ms;
  }
</style>
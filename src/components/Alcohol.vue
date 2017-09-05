<template>
  <div class="container">
    <div class="row text-center">
      <form v-on:submit.prevent="searchDrinks">
        <input type="text" placeholder="Search for a drink..." v-model="query">
        <v-btn slot="activator" class="btn" type="submit">Search</v-btn>
      </form>

      <div v-for="result in results">
        <v-flex xs12>
          <v-card dark class="zoomIn white--text" transition="slide-y-transition">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <div class="headline"> {{ results[0].name }} </div>
                    <div> {{ results[0].occasions[0].text }} </div>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media src="http://assets.absolutdrinks.com/drinks/transparent-background-white/soft-shadow/floor-reflection/absolut-cosmopolitan.png"
                    height="125px" contain></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </div>

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
      }
    },
    methods: {
      searchDrinks() {
        this.$store.dispatch('clearResults');
        this.$store.dispatch('search', this.query.replace(/\s+/g, '-').toLowerCase());
      }
    },
  }

</script>
<style>
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
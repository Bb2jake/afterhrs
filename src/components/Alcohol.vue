<template>
  <div class="container">
    <div class="row text-center">
      <form v-on:submit.prevent="searchDrinks">
        <input type="text" placeholder="Search for a drink..." v-model="query">
        <button class="btn" type="submit">Search</button>
      </form>

    </div>
  </div>
</template>
<script>

  export default {
    name: 'alcohol',
    data(){
      return{
        query: ''
      }
    },
    computed: {
      results() {
        this.$store.state.results
        console.log(this.$store.state.results)
      }
    },
    methods: {
			searchDrinks() {
					this.$store.dispatch('search', this.query.replace(/\s+/g, '-').toLowerCase());
			}
		},
}
</script>
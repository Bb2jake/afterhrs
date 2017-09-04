<template>
  <div class="container">
    <div class="row text-center">
      <h3>Results: {{ $store.state.results }} </h3>
      <form @submit.prevent="search">
        <input type="text" placeholder="Search for a drink..." v-model="query">
        <button class="btn btn-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'alcohol',
    data(){
      return{
        query: ''
      }
    },
    computed: mapGetters([
    ]),
    methods: {
      search: function () {
        this.store.dispatch('search', this.query)
      }
    }
  }
</script>
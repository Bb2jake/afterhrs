<template>
  <div class="container">
    <div class="row text-center">
      <h3>Results: {{ $store.state.results }} </h3>
      <button class="btn btn-success" @click="search">Search</button>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'hello',
    computed: mapGetters([
    ]),
    methods: mapActions([
      'search'
    ])
  }
</script>
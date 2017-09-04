import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
    results: []
}
const mutations = {
    setUsers(state, data) {
        state.results = data
    }
}
const actions = {
    search({ commit }, { data }) {
        Vue.http.get("https://addb.absolutdrinks.com/drinks/absolut-cosmopolitan/?apiKey=0ff6ee2b1fef44fab626292fb8348cb5")
            .then((response) => {
                commit("setUsers", response.body);
            })
            .catch((error => {
                console.log(error.statusText)
            }))
    }
}
const getters = {

}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
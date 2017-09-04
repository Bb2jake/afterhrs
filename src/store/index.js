import Vuex from 'vuex'
import Vue from 'vue'
import $ from 'jquery'


Vue.use(Vuex)


const state = {
    results: []
}

const mutations = {
    setResults(state, results) {
        state.results = JSON.parse(results)
    }
}
const actions = {
    search({ commit, dispatch }, query ) {
        var getterUrl = '//bcw-getter.herokuapp.com/?url=';
        var apiBaseUrl = 'https://addb.absolutdrinks.com/drinks/';
        var apiKey = '/?apiKey=0ff6ee2b1fef44fab626292fb8348cb5';
        var appId = '?appId=14689';
        var requestString = getterUrl + encodeURIComponent(apiBaseUrl + query + apiKey);
        $.get(requestString).then(data => {
            commit('setResults', data)
            console.log(state.results)
        }).catch((error => {
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
import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var store = new vuex.Store({
    state: {
        results: []
    },
    mutations: {
        setResults(state, results) {
            let parsedResult = Object.freeze(JSON.parse(results))
            let cleanResult = Object.freeze(parsedResult.result)
            state.results = cleanResult
            console.log(state.results)
        },
        resetResults(state) {
            state.results = []
        }
    },
    actions: {
        search({ commit, dispatch }, query) {
            var getterUrl = '//bcw-getter.herokuapp.com/?url=';
            var apiBaseUrl = 'https://addb.absolutdrinks.com/drinks/';
            var apiKey = '/?apiKey=0ff6ee2b1fef44fab626292fb8348cb5';
            var appId = '?appId=14689';
            var requestString = getterUrl + encodeURIComponent(apiBaseUrl + query + apiKey);
            $.get(requestString).then(data => {
                commit('setResults', data)
            })
        },
        clearResults({commit}){
            commit('resetResults')
        }
    }
})

export default store



import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

// addb.init({
//     appId: 14689,
//     host: window.location.host
// })


var store = new vuex.Store({
    state: {
        results: [],
        resultImgUrl: ''
    },
    mutations: {
        setResults(state, results) {
            // let parsedResult = Object.freeze(JSON.parse(results))
            // let cleanResult = Object.freeze(parsedResult.result)
            // let baseUrl = 'http://assets.absolutdrinks.com/drinks/transparent-background-white/soft-shadow/floor-reflection/'
            // let identifier = cleanResult[0].id
            // let urlEnd = '.png'
            // let imgUrl = baseUrl + identifier + urlEnd
            // state.resultImgUrl = imgUrl
            // state.results = cleanResult
            state.results = JSON.parse(results || '{result: []}').result
            // console.log(state.results)
        },
        resetResults(state) {
            state.results = []
            state.resultImgUrl = ''
        }
    },
    actions: {
        search({ commit, dispatch }, query) {
            // addb.drinks().quickSearch(query, (data) => {
            //     commit('SetResults', data)
            // })
            var getterUrl = '//bcw-getter.herokuapp.com/?url=';
            var apiBaseUrl = 'https://addb.absolutdrinks.com/quickSearch/drinks/';
            var apiKey = '/?apiKey=0ff6ee2b1fef44fab626292fb8348cb5';
            var appId = '?appId=14689';
            var requestString = getterUrl + encodeURIComponent(apiBaseUrl + query + apiKey);
            $.get(requestString).then(data => {
                commit('setResults', data)
            })
        },
        clearResults({ commit }) {
            commit('resetResults')
        }
    }
})

export default store



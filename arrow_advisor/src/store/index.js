import Vue from 'vue'
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions';
import Axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'https://arrowadvisorapi.herokuapp.com/'
export default new Vuex.Store({
    plugins: [VuexWebExtensions()],
    state: {
        loading : false,
        error : '',
        ingredients : [],
        name: '',
        value:0,
    },
    mutations: {
        setLoading (state, payload){
            state.loading = payload
        },

        setError (state, payload){
            state.error = payload
        },
        setIngredients (state, payload){
            state.ingredients = payload
        },

        setName (state, payload){
            state.name = payload
        },
        setValue (state, payload){
            state.value = payload
        },

    },
    actions: {
        clearError ({commit}){
            commit('clearError')
        },
        getAdvise({commit},payload){
            commit('setLoading',true)
            commit('clearError')
            Axios({url: baseUrl+'advise',data:payload ,method: 'POST' }).then(data => {
                console.log(data)
                if(! data.data.error){
                    commit('setLoading',false)
                    commit('setValue',data.data.percentage)
                    commit('setName',data.data.name)
                    commit('setIngredients',data.data.ingredients)
                }else{
                    commit('setLoading',false)
                    commit('setError',data.data.message)
                }
            }).catch(error => {
                console.log(error)
                commit('setLoading',false)
                commit('setError',error)
            })
        },
    },
    getters: {
        name(state){
            return state.name
        },
        ingredients(state){
            return state.ingredients
        },
        value(state){
            return state.value
        },
        loading (state){
            return state.loading
        },
        error (state){
            return state.error
        },
    }
})

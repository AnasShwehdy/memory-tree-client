import { createStore } from 'vuex'
import axios from 'axios'

const headers = { 'Content-Type': 'application/json' }
const store = createStore({
    state: {
        trees: [],
        currentTreeId: 0,
        port: '3333'
    },
    getters: {},
    mutations: {
        setTrees(state, data) {
            state.trees = data
        },
        setCurrentTree(state, data) {
            state.currentTreeId = data.id
        }
    },
    actions: {
        getTrees({ commit, state }, userId) {
            axios.get(`http://127.0.0.1:${state.port}/api/v1/trees?userId=${userId}&removeEmpty=true`, { headers: headers }).then(({ data }) => {
                commit('setTrees', data.data)
            }).catch(e => console.error(e))
        },
        createTree({ commit, state }) {
            axios.post(`http://127.0.0.1:${state.port}/api/v1/trees`, {
                'userId': 2
            }, { headers: headers }).then(({ data }) => {
                commit('setCurrentTree', data.data)
            }).catch(e => console.error(e))
        },
        createMemories({ state }, memories) {
            memories.forEach(async e => {
                await axios.post(`http://127.0.0.1:${state.port}/api/v1/memories`, {
                    'content': e,
                    'treeId': state.currentTreeId,
                }, { headers: headers }).catch(e => console.error(e))
            });
        },
    }
})
export default store


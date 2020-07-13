
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
import axios from 'axios'

export default  new Vuex.Store({
  state: {
    hits: null,
  },
  plugins: [createPersistedState()],
  // save data in localstorage
  getters: {
    HITS: state => {
      return state.hits;
    },
    HIT_BY_ID: state => id => {
      return state.hits.find(hit => hit.id === id)
    }
  },

  mutations: {
    SET_HITS: (state, payload) => {
      state.hits = payload;
    },

    UPDATE_HIT: (state, updatedHit) => {
      const indexOfHits = state.hits.findIndex(hit => hit.id == updatedHit.id)
      if(indexOfHits != -1){
        state.hits[indexOfHits].tags = updatedHit.tags
      }
    }
    //update tags in specific hit
  },

  actions: {
    GET_HITS: async (context, payload) => {
      let {hits} = (await axios.get('https://pixabay.com/api/?key=17443508-5c7aae1eadaf1065c950ef661&q=cats&image_type=all&per_page=100')).data;
      context.commit('SET_HITS', hits);
    }
  },
});

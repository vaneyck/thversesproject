import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    verses: null,
    playlist: []
  },
  getters: {
    getVerses (state) {
      return state.verses;
    },
    getPlaylist (state) {
      return state.playlist;
    }
  },
  mutations: {
    setVerses (state, versesData) {
      state.verses = versesData;
    },
    addToPlaylist (state, songId) {
      state.playlist.push(songId);
    }
  },
  actions: {
    setVerses (context, versesData) {
      context.commit('setVerses', versesData);
    },
    addToPlaylist (context, songId) {
      context.commit('addToPlaylist', songId);
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentVerseIdPlaying: null,
    verses: null,
    playlist: []
  },
  getters: {
    getVerses (state) {
      return state.verses;
    },
    getPlaylist (state) {
      return state.playlist;
    },
    getCurrentVerseIdPlaying (state) {
      return state.currentVerseIdPlaying;
    }
  },
  mutations: {
    setVerses (state, versesData) {
      state.verses = versesData;
    },
    addToPlaylist (state, verseId) {
      state.playlist.push(verseId);
    },
    setCurrentVerseIdPlaying (state, verseId) {
      state.currentVerseIdPlaying = verseId;
    }
  },
  actions: {
    setVerses (context, versesData) {
      context.commit('setVerses', versesData);
    },
    addToPlaylist (context, verseId) {
      context.commit('addToPlaylist', verseId);
    },
    setCurrentVerseIdPlaying (context, verseId) {
      context.commit('setCurrentVerseIdPlaying',verseId);
    }
  }
})

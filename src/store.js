import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentVerseIdPlaying: null,
    verses: null,
    playlist: [],
    currentAudioPlaying: null
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
    },
    getCurrentAudioPlaying (state) {
      return state.currentAudioPlaying;
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
    },
    setCurrentAudioPlaying (state, audio) {
      state.currentAudioPlaying =  audio;
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
    },
    setCurrentAudioPlaying (context, audio) {
      context.commit('setCurrentAudioPlaying', audio);
    }
  }
})

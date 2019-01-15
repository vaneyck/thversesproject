import Vue from 'vue'
import Vuex from 'vuex'

import Constants from "./util/constants.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    verses: null,
    playlist: [],
    player: {
      currentVerseIdPlaying: null,
      currentAudioPlaying: null,
      playerState: Constants.PlayerState.STOPPED,
      playerCommand: null
    }
  },
  getters: {
    getVerses (state) {
      return state.verses;
    },
    getPlaylist (state) {
      return state.playlist;
    },
    getCurrentVerseIdPlaying (state) {
      return state.player.currentVerseIdPlaying;
    },
    getCurrentAudioPlaying (state) {
      return state.player.currentAudioPlaying;
    },
    getPlayerState (state) {
      return state.player.playerState;
    },
    getPlayerCommand (state) {
      return state.player.playerCommand;
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
      state.player.currentVerseIdPlaying = verseId;
    },
    setCurrentAudioPlaying (state, audio) {
      state.player.currentAudioPlaying =  audio;
    },
    setPlayerState (state, status) {
      state.player.playerState = status;
    },
    setPlayerCommand (state, command) {
      state.player.playerCommand = command;
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
    },
    setPlayerState (context, status) {
      context.commit('setPlayerState', status);
    },
    setPlayerCommand (context, command) {
      context.commit('setPlayerCommand', command);
    }
  }
})

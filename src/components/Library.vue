<template>
  <div>
    <div v-if="songs">
      <div>
        <Song class="song" :id-playing="currentVerseIdPlaying" :song="song" v-for="(song, index) in songs" :key="index"/>
      </div>
    </div>
    <div v-else class="center">
      <Loading/>
    </div>
  </div>
</template>

<script>
import request from "request";
import Song from "./Song.vue";
import Loading from "./Loading.vue";
import Constants from "../util/constants.js";

export default {
  name: "Library",
  components: {
    Song, Loading
  },
  data() {
    return {
    };
  },
  mounted: function() {
    // pull data from jsonbin
    let jsonBinKey =
      "$2a$10$ekwFwK5pATRt9I60iWK8gOCPFDe2N8YzxsJBo4Wfez.rjoZa1urXq";
    let options = {
      url: "https://api.jsonbin.io/b/5bc59e6f716f9364f8c4fd9f/latest",
      headers: {
        "Content-type": "application/json",
        versioning: false,
        "secret-key": jsonBinKey
      }
    };
    request(options, (error, response, body) => {
      this.$store.dispatch('setVerses', JSON.parse(body).songs);
    });
  },
  computed: {
    currentVerseIdPlaying: function () {
      return this.$store.getters.getCurrentVerseIdPlaying;
    },
    songs: function () {
      return this.$store.getters.getVerses;
    },
    playlist: function () {
      return this.$store.getters.getPlaylist;
    },
    currentAudioPlaying: function () {
      return this.$store.getters.getCurrentAudioPlaying;
    },
  },
  methods: {
    // TODO All playing functions should be handled by the Player
    handleSongEvent: function(songEventData) {
    }
  }
};
</script>

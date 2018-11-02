<template>
  <div class="container">
    <h1>The Verses Project</h1>
    <div class="all-songs">
      <Song v-on:song-event="handleSongEvent" class="song" :song="song" v-for="(song, index) in songs" :key="index"/>
    </div>
    <div class="controls">
      <button class="button">Previous</button>
      <button class="button">Play</button>
      <button class="button">Next</button>
    </div>
  </div>
</template>

<script>
import request from "request";
import Song from "./Song.vue";

export default {
  name: "Library",
  components: {
    Song
  },
  data() {
    return {
      songs: null,
      currentSong: null,
      playlist: []
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
      this.songs = JSON.parse(body).songs;
    });
  },
  methods: {
    /**
     * Receive event to togglePlaying a song
     */
    handleSongEvent: function(songEventData) {
      if (songEventData.eventType == "play-song") {
        // this.currentSong = this.songs
        alert("TODO Work in progress : Play");
        // var aud = new Audio("sound.ogg");
        // //Now lets play the music
        // aud.play();
      }
      if (songEventData.eventType == "pause-song") {
        alert("TODO Work in progress : Pause");
      }
      if (songEventData.eventType == "add-song-to-playlist") {
        alert("TODO Work in progress : Add to playlist");
      }
    }
  }
};
</script>

<style scoped>
.all-songs {
  height: 80%;
  overflow: scroll;
}
.controls {
  height: 20%;
}
</style>

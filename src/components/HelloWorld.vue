<template>
  <div class="container">
    <h1>The Verses Project</h1>
    <div class="all-songs">
      <div class="song" v-for="(song, index) in songs" :key="index">
        <div class="level is-mobile">
          <div class="level-item level-left">
            <figure class="image is-128x128">
              <img :src="song.verseImage">
            </figure>
          </div>
          <div class="level-item level-left">
            <span>{{ song.title }}</span>
          </div>
          <div class="level-item">
            <button class="button" @click="play(song)">Play</button>
            <button class="button" @click="pause()">Pause</button>
            <button class="button" @click="addToPlayList(song)">Add to Playlist</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "request";

export default {
  name: "HelloWorld",
  data () {
    return {
      songs: null,
      currentSong: null
    }
  },
  mounted: function() {
    // pull data from jsonbin
    let jsonBinKey = "$2a$10$ekwFwK5pATRt9I60iWK8gOCPFDe2N8YzxsJBo4Wfez.rjoZa1urXq";
    let options = {
      url: 'https://api.jsonbin.io/b/5bc59e6f716f9364f8c4fd9f/latest',
      headers: {
        "Content-type": "application/json",
        'versioning': false,
        "secret-key": jsonBinKey
      }
    };
    request(options, (error, response, body) => {
      this.songs = JSON.parse(body).songs;
    });
  },
  methods: {
    play: function (song) {
      // TODO Read more here https://www.binarytides.com/using-html5-audio-element-javascript/
      if (this.currentSong) {
        this.currentSong.pause();
        this.currentSong = null;
      }
      this.currentSong = new Audio(song.mp3);
      this.currentSong.play();
    },
    pause: function () {
      this.currentSong.pause();
      this.currentSong = null;
    },
    addToPlayList: function (song) {
      alert("TODO : Add to playlist : " + song.title);
    }
  }
};
</script>

<style scoped>
</style>

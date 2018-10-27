<template>
  <div class="container">
    <h1>The Verses Project</h1>
    <div class="all-songs">
      <div class="song" v-for="(song, index) in songs" :key="index">
        <img :src="song.verseImage"/>
        <audio controls>
          <source :src="song.mp3" type="audio/mpeg">
        </audio>
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
      songs: null
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
  }
};
</script>

<style scoped>
</style>

<template>
  <div class="container">
    <div class="all-songs">
      <div v-if="songs">
        <div>
          <Song v-on:song-event="handleSongEvent" class="song" :id-playing="currentSongIdPlaying" :song="song" v-for="(song, index) in songs" :key="index"/>
        </div>
      </div>
      <div v-else class="center">
        <Loading/>
      </div>
    </div>
    <div class="controls">
      <Player :playlist="playlist"/>
    </div>
  </div>
</template>

<script>
import request from "request";
import Song from "./Song.vue";
import Player from "./Player.vue";
import Loading from "./Loading.vue";

export default {
  name: "Library",
  components: {
    Song, Player, Loading
  },
  data() {
    return {
      // TODO Move properties to vuex
      songs: null,
      currentSongIdPlaying: null,
      currentAudioPlaying: null,
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
  computed: {
    // TODO move to Player
    nowPlaying: function() {
      if (this.songs) {
        return this.songs.find(song => {
          return song.verse_id == this.currentSongIdPlaying;
        });
      } else {
        return null;
      }
    }
  },
  methods: {
    // TODO All playing functions should be handled by the Player
    handleSongEvent: function(songEventData) {
      if (songEventData.eventType == "play-song") {
        var songToPlay = this.songs.find(song => {
          return song.verse_id == songEventData.songId;
        });
        var songIsDifferent = this.currentSongIdPlaying != songToPlay.verse_id;
        var aud;
        if (this.currentAudioPlaying) {
          if (songIsDifferent) {
            this.currentAudioPlaying.pause();
          }
        }
        aud = new Audio(songToPlay.mp3);
        aud.play();
        this.currentAudioPlaying = aud;
        this.currentSongIdPlaying = songToPlay.verse_id;
      }
      if (songEventData.eventType == "pause-song") {
        this.currentAudioPlaying.pause();
      }
      if (songEventData.eventType == "add-song-to-playlist") {
        var song = this.playlist.find(song => {
          return song == songEventData.songId;
        });
        if (song) {
          M.toast({
            html: "Verse already in playlist",
            displayLength: 1500
          });
        } else {
          this.playlist.push(songEventData.songId);
          M.toast({
            html: "Adding verse to playlist",
            displayLength: 1500
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  height: inherit;
}
.all-songs {
  height: 80%;
  overflow: scroll;
}
.controls {
  height: 20%;
  padding-top: 5px;
}
.controls button {
  margin-left: 3px;
}
.now-playing {
  padding-left: 5px;
}
</style>

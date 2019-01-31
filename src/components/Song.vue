<template>
    <div class="song">
        <div class="song-container row">
          <div class="song-image col s4">
            <img class="responsive-img" :src="song.verseImage">
          </div>
          <div class="col s8">
            <div class="song-title">{{ song.title }}</div>
            <div class="song-controls">
              <button class="play btn btn-small" @click="togglePlay(song)">
                <i v-if="libraryIsPlaying" class="material-icons dp48">pause</i>
                <i v-if="!libraryIsPlaying" class="material-icons dp48">play_arrow</i>
              </button>
              <button class="add-to-playlist btn btn-small" @click="addToPlayList(song)">
                <i v-if="!songInPlaylist" class="material-icons dp48">playlist_add</i>
                <i v-if="songInPlaylist" class="material-icons dp48">playlist_add_check</i>
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Constants from "../util/constants.js";

export default {
  name: "Song",
  props: {
    idPlaying: Number,
    song: Object
  },
  data() {
    return {
      currentlyPlaying: false
    };
  },
  computed: {
    libraryIsPlaying: function () {
      return this.currentlyPlaying && (this.song.verse_id == this.idPlaying);
    },
    currentAudioPlaying: function () {
      return this.$store.getters.getCurrentAudioPlaying;
    },
    playlist: function () {
      return this.$store.getters.getPlaylist;
    },
    songInPlaylist: function () {
      return this.playlist.indexOf(this.song.verse_id) > -1;
    }
  },
  methods: {
    togglePlay: function(song) {
      // TODO Read more here https://www.binarytides.com/using-html5-audio-element-javascript/
      if (this.currentlyPlaying) {
        this.currentlyPlaying = false;
        if (this.currentAudioPlaying) {
          this.$store.dispatch('setPlayerCommand', Constants.PlayerCommand.PAUSE);
        }
        M.toast({
          html: "Pausing",
          displayLength: 1000
        });
      } else {
        this.currentlyPlaying = true;
        this.$store.dispatch('setCurrentVerseIdPlaying', song.verse_id);
        this.$store.dispatch('setPlayerCommand', Constants.PlayerCommand.PLAY);
        M.toast({
          html: "Playing " + song.title,
          displayLength: 1500
        });
      }
    },
    addToPlayList: function(verse) {
      var song = this.playlist.find(verseId => {
        return verse.verse_id == verseId;
      });
      if (song) {
        M.toast({
          html: `Verse is already in the playlist`,
          displayLength: 1500
        });
      } else {
        this.$store.dispatch('addToPlaylist', verse.verse_id);
        M.toast({
          html: "Adding verse to playlist",
          displayLength: 1500
        });
      }
    }
  }
};
</script>

<style scoped>
.play {
}
.add-to-playlist {
  margin-left: 5px;
}
</style>
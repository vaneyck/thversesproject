<template>
    <div class="player">
      <div class="now-playing">
        <span v-if="currentlyPlayingVerse">
          Playing : {{ currentlyPlayingVerse.title }}
        </span>
        <span v-else>
          No Song Playing
        </span>
      </div>
      <div>
        <button class="btn">Previous</button>
        <button class="btn">Play</button>
        <button class="btn">Next</button>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
    playlist: function () {
      return this.$store.getters.getPlaylist;
    }
  },
  data () {
    return {
      //currentAudioPlaying: null, // This is the audio object
    }
  },
  computed: {
    currentVerseIdPlaying: function () {
      return this.$store.getters.getCurrentVerseIdPlaying;
    },
    currentlyPlayingVerse: function () {
      if (this.songs) {
        return this.songs.find(song => {
          return song.verse_id == this.currentVerseIdPlaying;
        });
      } else {
        return null;
      }
    },
    currentAudioPlaying: function () {
      return this.$store.getters.getCurrentAudioPlaying;
    },
    songs: function () {
      return this.$store.getters.getVerses;
    },
  },
  watch: {
    currentVerseIdPlaying: function (newVerse, oldVerse) {
      var songToPlay = this.songs.find(song => {
        return song.verse_id == newVerse;
      });
      var songIsDifferent = this.currentVerseIdPlaying != songToPlay.verse_id;
      var aud;
      if (this.currentAudioPlaying) {
        if (songIsDifferent) {
          this.currentAudioPlaying.pause();
        }
      }
      aud = new Audio(songToPlay.mp3);
      aud.play();
      this.$store.dispatch('setCurrentAudioPlaying', aud);
    }
  }
};
</script>

<style scoped>
.now-playing {
  padding-left: 5px;
}
</style>
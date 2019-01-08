<template>
    <div class="player">
      <div class="now-playing">
        <span v-if="currentlyPlayingSong">
          Playing : {{ currentlyPlayingSong.title }}
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
      currentlyPlayingVerse: null, // Get this from vuex
      currentAudioPlaying: null, // This is the audio object
    }
  }
};
</script>

<style scoped>
.now-playing {
  padding-left: 5px;
}
</style>
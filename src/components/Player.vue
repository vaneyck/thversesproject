<template>
    <div class="player">
      <div class="now-playing">
        <span v-if="nowPlaying">
          Playing : {{ nowPlaying.title }}
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
  props: {
    playlist: Object
  },
  data () {
    return {
      currentlyPlayingSong: null
    }
  }
};
</script>
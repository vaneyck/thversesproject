<template>
    <div class="song">
        <div class="song-container row">
          <div class="song-image col s6">
            <img class="responsive-img" :src="song.verseImage">
          </div>
          <div class="col s6">
            <div class="song-title">{{ song.title }}</div>
            <div class="song-controls">
              <button class="play btn btn-small" @click="togglePlay(song)">
                <i v-if="libraryIsPlaying" class="material-icons dp48">pause</i>
                <i v-if="!libraryIsPlaying" class="material-icons dp48">play_arrow</i>
              </button>
              <button class="add-to-playlist btn btn-small" @click="addToPlayList(song)">
                <i class="material-icons dp48">playlist_add</i>
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
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
    }
  },
  methods: {
    togglePlay: function(song) {
      // TODO Read more here https://www.binarytides.com/using-html5-audio-element-javascript/
      if (this.currentlyPlaying) {
        this.currentlyPlaying = false;
        this.$emit("song-event", { eventType: "pause-song", songId: song.verse_id });
        M.toast({
          html: "Pausing",
          displayLength: 1000
        });
      } else {
        this.currentlyPlaying = true;
        this.$emit("song-event", { eventType: "play-song", songId: song.verse_id });
        M.toast({
          html: "Playing " + song.title,
          displayLength: 1500
        });
      }
    },
    addToPlayList: function(song) {
      this.$emit("song-event", {
        eventType: "add-song-to-playlist",
        songId: song.verse_id
      });
    }
  }
};
</script>

<style scoped>
.play {
  display: block;
  margin-bottom: 2px;
}
.add-to-playlist {
  display: block;
}
</style>
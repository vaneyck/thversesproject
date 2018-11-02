<template>
    <div class="song">
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
            <button class="button" @click="togglePlay(song.id)">{{ playingStatusText }}</button>
            <button class="button" @click="addToPlayList(song.id)">Add to Playlist</button>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Song",
  props: {
    song: Object
  },
  data() {
    return {
      currentlyPlaying: false
    };
  },
  methods: {
    togglePlay: function(songId) {
      // TODO Read more here https://www.binarytides.com/using-html5-audio-element-javascript/
      if (this.currentlyPlaying) {
        this.currentlyPlaying = false;
        this.$emit("song-event", { eventType: "pause-song", songId: songId });
      } else {
        this.currentlyPlaying = true;
        this.$emit("song-event", { eventType: "play-song", songId: songId });
      }
    },
    addToPlayList: function(songId) {
      this.$emit("song-event", {
        eventType: "add-song-to-playlist",
        songId: songId
      });
    }
  },
  computed: {
    playingStatusText: function() {
      if (this.currentlyPlaying) {
        return "Pause";
      } else {
        return "Play";
      }
    }
  }
};
</script>
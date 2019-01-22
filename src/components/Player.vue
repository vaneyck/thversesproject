<template>
    <div class="player">
      <div class="now-playing">
        <span v-if="currentlyPlayingVerse">
          {{this.currentVerseIdPlaying}} : Playing : {{ currentlyPlayingVerse.title }} == {{ currentAudioTime }} / {{fullAudioTime}}
        </span>
        <span v-else>
          No Song Playing
        </span>
      </div>
      <div>
        <button class="btn" @click="goToPreviousSong">
          <i class="material-icons dp48">skip_previous</i>
        </button>
        <button class="btn" @click="togglePlay">
          <i v-if="(playerState == 'playing')" class="material-icons dp48">pause</i>
          <i v-if="(playerState == 'paused')" class="material-icons dp48">play_arrow</i>
          <i v-if="(playerState == 'stopped')" class="material-icons dp48">play_arrow</i>
        </button>
        <button class="btn" @click="goToNextSong">
          <i class="material-icons dp48">skip_next</i>
        </button>
        <button class="btn">
          <i class="material-icons dp48">queue</i>
        </button>
      </div>
    </div>
</template>

<script>
import Constants from "../util/constants.js";

export default {
  data () {
    return {
      // TODO
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
    playlist: function () {
      return this.$store.getters.getPlaylist;
    },
    playerState: function () {
      return this.$store.getters.getPlayerState;
    },
    playerCommand: function () {
      return this.$store.getters.getPlayerCommand;
    },
    playLabel: function () {
      if (this.playerState == Constants.PlayerState.PAUSED) {
        return "PLAY";
      } else if (this.playerState == Constants.PlayerState.PLAYING) {
        return "PAUSE";
      } else {
        return "- -"
      }
    },
    currentAudioTime: function () {
      if (this.currentAudioPlaying) {
        return this.currentAudioPlaying.currentTime;
      }
    },
    fullAudioTime: function () {
      if (this.currentAudioPlaying) {
        return this.currentAudioPlaying.duration;
      }
    }
  },
  watch: {
    playerCommand: function (newCommand, oldCommand) {
      var pause = (newCommand == Constants.PlayerCommand.PAUSE);
      if (pause) {
        this.pauseVerse();
      } else {
        console.log("playing", this.currentVerseIdPlaying);
        this.pauseVerse();
        this.playVerse(this.currentVerseIdPlaying);
      }
    }
  },
  methods: {
    togglePlay: function () {
      //FIXME trigger a PlayerCommand
      if (this.playerState == Constants.PlayerState.PAUSED) {
        if (this.currentAudioPlaying) {
          this.playVerse(this.currentVerseIdPlaying);
        }
      } else if (this.playerState == Constants.PlayerState.PLAYING) {
        if (this.currentAudioPlaying) {
          this.pauseVerse();
        }
      } else {
        this.goToNextSong();
      }
    },
    pauseVerse: function () {
      console.log("pausing", this.currentAudioPlaying)
      if (this.currentAudioPlaying) {
        this.currentAudioPlaying.pause();
        this.$store.dispatch('setPlayerState', Constants.PlayerState.PAUSED);
      }
    },
    playVerse: function(verseId) {
      var songToPlay = this.songs.find(song => {
        return song.verse_id == verseId;
      });
      var aud = new Audio(songToPlay.mp3);
      aud.play();
      this.$store.dispatch('setCurrentAudioPlaying', aud);
      this.$store.dispatch('setPlayerState', Constants.PlayerState.PLAYING);
    },
    goToNextSong: function () {
      if (this.playlist.length == 0) {
        console.log("returning because playlist size is ZERO")
        return;
      }
      let currentPlayingVerseIndexInPlaylist = this.playlist.indexOf(this.currentVerseIdPlaying);
      let verseIdToPlay = this.playlist[currentPlayingVerseIndexInPlaylist + 1];
      if (this.playlist.length == currentPlayingVerseIndexInPlaylist + 1) {
        console.log("returning because end of playlist")
        return;
      }
      this.$store.dispatch('setCurrentVerseIdPlaying', verseIdToPlay);
      this.$store.dispatch('setPlayerCommand', Constants.PlayerCommand.PLAY);
    },
    goToPreviousSong: function () {
      if (this.playlist.length == 0) {
        console.log("returning because playlist size is ZERO")
        return;
      }
      let currentPlayingVerseIndexInPlaylist = this.playlist.indexOf(this.currentVerseIdPlaying);
      let verseIdToPlay = this.playlist[currentPlayingVerseIndexInPlaylist - 1];
      if (currentPlayingVerseIndexInPlaylist - 1 == -1) {
        console.log("returning because at the start of playlist")
        return;
      }
      this.$store.dispatch('setCurrentVerseIdPlaying', verseIdToPlay);
      this.$store.dispatch('setPlayerCommand', Constants.PlayerCommand.PLAY);
    },
  }
};
</script>

<style scoped>
.now-playing {
  padding-left: 5px;
}
</style>
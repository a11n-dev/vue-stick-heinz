// Show/Hide modal methods mixin
export const modalMixin = {
  methods: {
    langsPopup: function () {
      const menubg = document.getElementById('menubg')
      const popup = document.querySelector('.popup-langs')
      
      if (popup.classList.contains('opened')) {
        // Close
        popup.classList.remove('opened')
        menubg.classList.remove('fade-in')
      } else {
        // Open
        popup.classList.add('opened')
        menubg.classList.add('fade-in')
      }
    }
  }
}

import { threatSongs } from "./helpers/utils";
import mockReleases from "./mocks/releases";
import audioPlayer from "./audio-player";

export const audioMixin = {
  data() {
    return {
      songs: [],
    }
  },
  computed: {
    current() {
      return audioPlayer.state.current;
    },
    isPlaying() {
      return audioPlayer.state.isPlaying;
    },
    clickCounter() {
      return audioPlayer.state.clickCounter;
    },
    player() {
      return audioPlayer.player;
    }
  },
  methods: {
    getReliases() {
      // Use mock data instead of API
      setTimeout(() => {
        this.songs = threatSongs(mockReleases);
      }, 100);
    },
    play(song) {
      audioPlayer.play(song);
    },
    pause() {
      audioPlayer.pause();
    },
    sound() {
      audioPlayer.toggleSound();
    },
    rewind(event) {
      audioPlayer.rewind(event);
    },
  }
}
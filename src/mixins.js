// Show/Hide modal methods mixin
export const modalMixin = {
  methods: {
    langsPopup: function () {
      const menubg = document.getElementById('menubg')
      const popup = document.querySelector('.popup-langs')
      
      if (popup.classList.contains('opened')) {
        // Закрываем
        popup.classList.remove('opened')
        menubg.classList.remove('fade-in')
      } else {
        // Открываем
        popup.classList.add('opened')
        menubg.classList.add('fade-in')
      }
    }
  }
}

import { threatSongs } from "./helpers/utils";
import mockReleases from "./mocks/releases";

export const audioMixin = {
  data() {
    return {
      songs: [],
      current: {},
      isPlaying: false,
      isMuted: false,
      clickCounter: 0,
      player: new Audio(),
    }
  },
  methods: {
    getReliases() {
      // Используем моковые данные вместо API
      setTimeout(() => {
        this.songs = threatSongs(mockReleases);
      }, 100);
    },
    listenersWhenPlay() {
      this.player.addEventListener("timeupdate", () => {
        var playerTimer = this.player.currentTime;

        this.current.percent = (playerTimer * 100) / this.current.seconds;
        this.current.isPlaying = true;
      });
    },
    play(song) {
      if (typeof song.src !== "undefined" && this.current !== song) {
        this.current.isPlaying = false;
        this.current = song;
        this.player.src = this.current.src;
      }

      this.player.play();
      this.isPlaying = true;
      this.current.isPlaying = true;

      this.listenersWhenPlay();
    },
    pause() {
      this.player.pause();

      setTimeout(() => {
        this.isPlaying = false;
        this.current.isPlaying = false;
      }, 100)
    },
    sound() {
      this.clickCounter++

      switch (this.clickCounter) {
        case 1:
          this.player.volume = .5
          break;
        case 2:
          this.player.muted = true
          break;
        case 3:
          this.player.muted = false
          this.clickCounter = 0
          break;
          
        default:
          break;
      }
      
      this.isMuted = !this.isMuted
    },
    rewind(event) {
      let progressClickPercent =  event.offsetX / event.currentTarget.offsetWidth;
      this.player.currentTime = this.current.seconds * progressClickPercent
    },
  }
}
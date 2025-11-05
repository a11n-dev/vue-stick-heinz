// Show/Hide modal methods mixin
export const modalMixin = {
  methods: {
    langsPopup: function () {
      document.getElementById('menubg').classList.toggle('fade-in')
      document.querySelector('.popup-langs').classList.toggle('opened')
    }
  }
}

import axios from "axios"; // Axios pack
import { apiURL, threatSongs } from "./helpers/utils";

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
      axios.get(apiURL + '/api/release').then((response) => {
        this.songs = response.data.content;
        this.songs = threatSongs(this.songs);
      });
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
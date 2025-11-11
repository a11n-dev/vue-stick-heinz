// Global audio player (single instance for the entire application)
import { reactive } from 'vue';

class AudioPlayer {
  constructor() {
    this.player = new Audio();
    
    // Reactive state
    this.state = reactive({
      current: {},
      isPlaying: false,
      clickCounter: 0
    });

    // Set up listener only once
    this.player.addEventListener("timeupdate", () => {
      this.updateProgress();
    });

    this.player.addEventListener("ended", () => {
      this.state.isPlaying = false;
      if (this.state.current) {
        this.state.current.isPlaying = false;
      }
    });
  }

  play(song) {
    if (typeof song.src !== "undefined" && this.state.current !== song) {
      if (this.state.current.isPlaying) {
        this.state.current.isPlaying = false;
      }
      this.state.current = song;
      this.player.src = this.state.current.src;
    }

    this.player.play();
    this.state.isPlaying = true;
    this.state.current.isPlaying = true;
  }

  pause() {
    this.player.pause();
    this.state.isPlaying = false;
    if (this.state.current) {
      this.state.current.isPlaying = false;
    }
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
    this.state.isPlaying = false;
    if (this.state.current) {
      this.state.current.isPlaying = false;
      this.state.current.percent = 0;
    }
  }

  toggleSound() {
    this.state.clickCounter++;

    switch (this.state.clickCounter) {
      case 1:
        // Medium volume
        this.player.volume = 0.5;
        this.player.muted = false;
        break;
      case 2:
        // Muted
        this.player.muted = true;
        break;
      case 3:
        // Full volume
        this.player.volume = 1.0;
        this.player.muted = false;
        this.state.clickCounter = 0;
        break;
      default:
        break;
    }
  }

  rewind(event) {
    if (!this.state.current.seconds) return;
    let progressClickPercent = event.offsetX / event.currentTarget.offsetWidth;
    this.player.currentTime = this.state.current.seconds * progressClickPercent;
  }

  updateProgress() {
    if (!this.state.current.seconds) return;
    const playerTimer = this.player.currentTime;
    this.state.current.percent = (playerTimer * 100) / this.state.current.seconds;
    this.state.current.isPlaying = !this.player.paused;
    this.state.isPlaying = !this.player.paused;
  }
}

// Export single instance
export default new AudioPlayer();

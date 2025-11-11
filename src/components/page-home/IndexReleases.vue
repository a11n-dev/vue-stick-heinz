<template>
  <div class="index-releases" id="releases">
    <div class="block-name">{{ $t("releases.title") }}</div>

    <swiper
      v-if="songs && songs.length > 0"
      :modules="modules"
      :slides-per-view="slidesPerView"
      :space-between="0"
      :centeredSlides="true"
      :navigation="navigation"
      :pagination="{
        clickable: false,
      }"
      class="list"
    >
      <swiper-slide v-for="song in songs" :key="song.id">
        <div class="item">
          <div class="image">
            <img
              :src="song.cover || require('@/assets/release.png')"
            />
          </div>
          <div class="flex">
            <div class="name">{{ song.track || song.title }}</div>
            <div class="share">
              <a
                v-if="song.releaseLinks && song.releaseLinks.youtube"
                tabindex="-1"
                target="_blank"
                :href="song.releaseLinks.youtube"
              ></a>
              <a
                v-if="song.releaseLinks && song.releaseLinks.soundcloud"
                tabindex="-1"
                target="_blank"
                :href="song.releaseLinks.soundcloud"
              ></a>
              <a
                v-if="song.releaseLinks && song.releaseLinks.spotify"
                tabindex="-1"
                target="_blank"
                :href="song.releaseLinks.spotify"
              ></a>
              <a
                v-if="song.srcDownload"
                class="downloads"
                :href="song.srcDownload"
                :download="song.track || song.title"
                >{{ song.downloads || 0 }}
              </a>
            </div>
          </div>
          <div class="flex">
            <div class="links">
              <a tabindex="-1" v-show="!song.isPlaying" @click="play(song)"
                ><font-awesome-icon :icon="['fa', 'play']"
              /></a>
              <a tabindex="-1" v-show="song.isPlaying" @click="pause()"
                ><font-awesome-icon :icon="['fa', 'pause']"
              /></a>
              <a v-show="clickCounter == 0" @click="sound"
                ><font-awesome-icon :icon="['fa', 'volume-up']"
              /></a>
              <a v-show="clickCounter == 1" @click="sound"
                ><font-awesome-icon :icon="['fa', 'volume-down']"
              /></a>
              <a v-show="clickCounter == 2" @click="sound"
                ><font-awesome-icon :icon="['fa', 'volume-mute']"
              /></a>
            </div>
            <div class="time">{{ song.length }}</div>
          </div>
          <div class="line" @click="rewind">
            <div
              class="progress"
              :style="'width:' + `${song.percent}` + '%'"
            ></div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { audioMixin } from "../../mixins";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Pagination],
      slidesPerView: 4,
      navigation: true,
    };
  },
  mixins: [audioMixin],
  created() {
    this.getReliases();
    setTimeout(() => this.sortByDate(), 500);
    this.windowResize();
    window.addEventListener("resize", this.windowResize);
  },
  methods: {
    windowResize() {
      if (window.innerWidth <= 1199.98 && window.innerWidth >= 768) {
        this.slidesPerView = 3;
        this.navigation = true;
      } else if (window.innerWidth <= 767.98 && window.innerWidth >= 576) {
        this.slidesPerView = 2;
        this.navigation = true;
      } else if (window.innerWidth <= 575.98) {
        this.slidesPerView = 1;
        this.navigation = false;
      } else {
        this.slidesPerView = 3;
        this.navigation = true;
      }
    },
    sortByDate: function () {
      this.songs = this.songs
        .slice()
        .sort((a, b) => new Date(b.created) - new Date(a.created));
    },
  },
};
</script>

<style>
.index-releases {
  padding: 140px 0 70px;
}
.index-releases .block-name {
  text-align: center;
  padding: 0 10px 45px 10px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
}
.index-releases .list .item {
  position: relative;
  padding: 30px;
  background: linear-gradient(
    135.39deg,
    rgba(62, 62, 62, 0) -7.3%,
    #161616 73.98%
  );
  transform: scale(0.7);
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}
.index-releases .list .swiper-slide-active .item {
  transform: none;
}
.index-releases .list .swiper-slide-active .item .share {
  display: flex;
}
.index-releases .list .swiper-slide-active .item .links {
  display: flex;
  align-items: center;
}
.index-releases .list .swiper-slide-active .item .time {
  display: block;
}
.index-releases .list .swiper-slide-active .item .line {
  display: block;
}
.index-releases .list .swiper-slide-active .item .flex {
  flex-wrap: nowrap;
}
.index-releases .list .swiper-slide-active .item .name {
  color: #fff;
  font-weight: 700;
  width: auto;
  max-width: 50%;
  overflow: scroll;
  margin-right: 10px;
}
.index-releases .list .item .image {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-releases .list .item .image img {
  width: 100%;
  filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.54));
}
.index-releases .list .item .name {
  margin-bottom: 24px;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.4px;
  width: 100%;
  text-align: center;
  color: #a9a9a9;
  font-weight: 400;
}
.index-releases .list .item .share {
  margin-bottom: 24px;
  padding-top: 5px;
  display: none;
}
.index-releases .list .item .share a:not(.downloads) {
  display: none; /* Скрываем иконки социальных сетей без background */
}

.index-releases .list .item .share .downloads {
  display: inline-block;
  vertical-align: middle;
  height: 26px;
  line-height: 26px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  border: 1px solid #a0a0a0;
  background: url("../../assets/downloads.svg") no-repeat left 10px top 50%;
  padding: 0 10px 0 30px;
  color: #a9a9a9;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
}
.index-releases .list .item .share .downloads:hover {
  border: 1px solid #fff;
  color: #fff;
  background: url("../../assets/downloadsh.svg") no-repeat left 10px top 50%;
}
.index-releases .list .item .links {
  margin-bottom: 10px;
  display: none;
}
.index-releases .list .item .links a {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  font-size: 16px;
  transition: all 0.3s;
  color: #59f37b;
}

.index-releases .list .item .links a:hover {
  color: #fff;
}

.index-releases .list .item .links a:nth-of-type(1),
.index-releases .list .item .links a:nth-of-type(2) {
  font-size: 12px;
}

.index-releases .list .item .time {
  font-size: 12px;
  line-height: 19px;
  margin-bottom: 10px;
  color: #a9a9a9;
  display: none;
}
.index-releases .list .item .line {
  height: 1px;
  background: #262626;
  position: absolute;
  width: calc(100% - 60px);
  display: none;
  transition: all 0.3s;
  cursor: pointer;
}
.index-releases .list .item .line .progress {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}

.index-releases .list .item:hover .line {
  height: 6px;
}

.swiper-button-prev::before,
.swiper-button-next::before {
  position: absolute;
  content: "";
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
  top: -50%;
}

.swiper-button-prev::before {
  left: -10px;
}

.swiper-button-next::before {
  right: -10px;
}

.index-releases .list .swiper-button-prev,
.index-releases .list .swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  font-size: 0;
  z-index: 2;
  width: 26px;
  height: 26px;
}
.index-releases .list .swiper-button-prev {
  left: 50%;
  margin-left: -450px;
  background: url("../../assets/prev.svg");
  cursor: pointer;
}
.index-releases .list .swiper-button-next {
  right: 50%;
  margin-right: -450px;
  background: url("../../assets/next.svg");
  cursor: pointer;
}

.index-releases .list .swiper-button-prev::after,
.index-releases .list .swiper-button-next::after {
  display: none;
}

.index-releases .swiper-pagination {
  display: none;
}

@media (max-width: 974px) {
  .index-releases .list .swiper-button-prev {
    left: 100px;
    margin: 0;
  }
  .index-releases .list .swiper-button-next {
    right: 100px;
    margin: 0;
  }
}

@media (max-width: 576px) {
  .index-releases {
    padding: 70px 0 50px;
  }
  .index-releases .list .item {
    padding: 30px 30px 80px 30px;
    position: relative;
  }
  .index-releases .list .item .share {
    position: absolute;
    width: 100%;
    bottom: 30px;
    left: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 30px;
    margin: 0;
  }
  .index-releases .list .item .share .downloads {
    float: right;
  }
  .index-releases .list .item .name {
    font-weight: 500 !important;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .index-releases .swiper-pagination {
    display: block;
    text-align: center;
    left: 0 !important;
    width: 100% !important;
  }
}
</style>
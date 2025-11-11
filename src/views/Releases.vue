<template>
  <div class="releases-page">
    <div class="wrap">
      <div class="flex">
        <nav class="menu1">
          <a
            href="#"
            :class="{ active: dateSortMethod }"
            v-on:click.prevent="sortByDate()"
            ><span
              ><i>{{ $t("controls.sort.byDate") }}</i></span
            ></a
          >
          <a
            href="#"
            :class="{ active: downloadsSortMethod }"
            v-on:click.prevent="sortByDownloads()"
            ><span
              ><i>{{ $t("controls.sort.byDownloads") }}</i></span
            ></a
          >
        </nav>
        <nav class="menu2">
          <a class="sort-toggle" data-sort-tag="demo"
            ><span>{{ $t("controls.filter.demo") }}</span></a
          >
          <a class="sort-toggle active" data-sort-tag="new"
            ><span>{{ $t("controls.filter.releases") }}</span></a
          >
        </nav>
      </div>
      <div class="flex">
        <div class="item" v-for="song in releasesPosts" :key="song.id">
          <div class="badge" v-if="song.new">latest</div>
          <div class="badge red" v-if="song.type === 'demo'">DEMO</div>
          <div class="top-content">
            <div
              class="image"
              :style="'background: url(' + (song.cover || require('@/assets/release.png')) + ')'"
            ></div>
            <div class="flex">
              <div class="name">{{ song.track || song.title }}</div>
              <div class="share">
                <a v-if="song.releaseLinks?.youtube" tabindex="-1" :href="song.releaseLinks.youtube" target="_blank"></a>
                <a v-if="song.releaseLinks?.soundcloud" tabindex="-1" :href="song.releaseLinks.soundcloud" target="_blank"></a>
                <a v-if="song.releaseLinks?.spotify" tabindex="-1" :href="song.releaseLinks.spotify" target="_blank"></a>
                <a
                  v-if="song.srcDownload"
                  class="downloads"
                  :href="song.srcDownload"
                  :download="song.track || song.title"
                  >{{ song.downloads || 0 }}</a
                >
              </div>
            </div>
            <div class="flex">
              <div class="links">
                <a tabindex="-1" v-show="!song.isPlaying" @click="play(song)"
                  ><font-awesome-icon :icon="['fa', 'play']"
                /></a>
                <a tabindex="-1" v-show="song.isPlaying" @click="pause(song)"
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
              <div class="time">{{ song.length || (Math.floor(song.seconds / 60) + ':' + String(song.seconds % 60).padStart(2, '0')) }}</div>
            </div>
            <div class="line" @click="rewind">
              <div
                class="progress"
                :style="'width:' + `${song.percent}` + '%'"
              ></div>
            </div>
          </div>
          <div class="date">
            {{
              new Date(song.created).toLocaleDateString($i18n.locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </div>
          <p v-if="song.desc && Array.isArray(song.desc)">
            {{ song.desc[getLangIndex(song.desc)]?.value || '' }}
          </p>

          <div class="tags" v-if="song.tags && song.tags.length > 0">
            <a href="" v-for="tag in song.tags" :key="tag">
              <span>{{ tag.value ? tag.value[getLangIndex(tag.value)]?.value : tag }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="pages" v-if="numberOfPages > 1">
        <a
          href="#"
          class="prev"
          :class="{ disabled: page == 0 }"
          @click="page--"
        ></a>
        <a
          href="#"
          v-for="(pageNumber, index) in pages"
          :key="index"
          :class="{ active: page == index }"
          @click="page = index"
          >{{ pageNumber }}</a
        >
        <a
          href="#"
          class="next"
          :class="{ disabled: page == pages.length - 1 }"
          @click="page++"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import { audioMixin } from "../mixins";
import { threatSongs } from "../helpers/utils";
import mockReleases from "../mocks/releases";

export default {
  name: "Releases",
  data() {
    return {
      releasesPosts: [],
      arr: null,
      dateSortMethod: true,
      downloadsSortMethod: false,

      page: 0,
      perPage: 4,
      numberOfPages: null,
      pages: [],
    };
  },
  mixins: [audioMixin],
  methods: {
    sortByDate: function () {
      const sorted = [...mockReleases].sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return this.dateSortMethod ? dateB - dateA : dateA - dateB;
      });
      
      this.releasesPosts = this.paginateData(sorted);
      this.dateSortMethod = !this.dateSortMethod;
    },
    sortByDownloads: function () {
      const sorted = [...mockReleases].sort((a, b) => {
        return this.downloadsSortMethod 
          ? a.downloads - b.downloads 
          : b.downloads - a.downloads;
      });
      
      this.releasesPosts = this.paginateData(sorted);
      this.downloadsSortMethod = !this.downloadsSortMethod;
    },
    getSongReliases() {
      // Используем моковые данные
      setTimeout(() => {
        const sorted = [...mockReleases].sort((a, b) => {
          return new Date(b.created) - new Date(a.created);
        });
        this.releasesPosts = threatSongs(this.paginateData(sorted));
        this.numberOfPages = Math.ceil(mockReleases.length / this.perPage);
      }, 100);
    },
    paginateData(data) {
      const start = this.page * this.perPage;
      const end = start + this.perPage;
      return data.slice(start, end);
    },
    getLangIndex(array) {
      if (!array || !Array.isArray(array)) return 0;
      return array
        .map((e) => {
          return e.lang;
        })
        .indexOf(i18n.global.locale.value.toLowerCase());
    },
    releasesFilter(tag) {
      if (this.arr == null) {
        this.arr = mockReleases;
      }

      let filtered;
      if (tag == "demo") {
        filtered = this.arr.filter((song) => song.type === "demo");
      } else {
        filtered = this.arr;
      }
      
      this.releasesPosts = threatSongs(this.paginateData(filtered));
      this.numberOfPages = Math.ceil(filtered.length / this.perPage);
    },

    setPages() {
      if (this.pages.length > 0) this.pages = [];

      for (let index = 1; index <= this.numberOfPages; index++) {
        this.pages.push(index);
      }
    },
  },
  created() {
    this.getSongReliases();
  },
  mounted() {
    document.querySelectorAll(".sort-toggle").forEach((element) => {
      element.onclick = (e) => {
        document
          .querySelector(".sort-toggle.active")
          .classList.remove("active");
        e.currentTarget.classList.add("active");

        this.releasesFilter(e.currentTarget.dataset.sortTag);
      };
    });
  },
  watch: {
    releasesPosts() {
      this.setPages();
    },
    page() {
      // Обновляем данные при смене страницы
      this.getSongReliases();
    },
  },
};
</script>

<style>
.releases-page {
  padding-bottom: 160px;
  border-bottom: 1px solid #2e2e2e;
}
.releases-page .menu1 {
  margin-bottom: 30px;
}
.releases-page .menu1 a {
  display: inline-block;
  text-decoration: none;
  margin-right: 18px;
  background: #333;
  padding: 1px;
  border-bottom: 1px solid #59f37b;
}
.releases-page .menu1 a:last-child {
  margin-right: 0;
}
.releases-page .menu1 a:hover,
.releases-page .menu1 a.active {
  border-bottom: 0;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}
.releases-page .menu1 a:hover span i {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.releases-page .menu1 a span {
  display: block;
  padding: 15px 26px;
  background: #1c1c1c;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #a9a9a9;
}
.releases-page .menu1 a span i {
  font-style: normal;
}
.releases-page .menu2 {
  margin-bottom: 30px;
  font-size: 0;
}
.releases-page .menu2 a {
  display: inline-block;
  text-decoration: none;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%);
  padding: 2px;
  margin-left: -2px;
}
.releases-page .menu2 a.active span {
  background: none;
  color: #1c1c1c;
}
.releases-page .menu2 a span {
  display: block;
  padding: 15px 0;
  width: 130px;
  text-align: center;
  background: #1c1c1c;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}
.releases-page .item {
  width: 47%;
  margin-bottom: 100px;
  position: relative;
}
.releases-page .item .badge {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  color: #1c1c1c;
}
.releases-page .item .badge.red {
  color: #fff;
  background: #f33f3f;
}
.releases-page .item .top-content {
  padding: 70px 105px;
  margin-bottom: 23px;
  background: linear-gradient(
    135.39deg,
    rgba(62, 62, 62, 0) -7.3%,
    #161616 73.98%
  );
}
.releases-page .item .top-content .image {
  margin-bottom: 30px;
  min-height: 400px;
  background-size: cover !important;
  background-position: center !important;
  filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.54));
}
.releases-page .item .top-content .name {
  margin-bottom: 24px;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.4px;
  font-weight: 700;
}
.releases-page .item .top-content .share {
  margin-bottom: 24px;
  padding-top: 5px;
}
.releases-page .item .top-content .share a:not(.downloads) {
  display: none; /* Скрываем иконки социальных сетей, т.к. нет background */
}
.releases-page .item .top-content .share .downloads {
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
  background: url("../assets/downloads.svg") no-repeat left 10px top 50%;
  padding: 0 10px 0 30px;
  color: #a9a9a9;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
}
.releases-page .item .top-content .share .downloads:hover {
  border: 1px solid #fff;
  color: #fff;
  background: url("../assets/downloadsh.svg") no-repeat left 10px top 50%;
}
.releases-page .item .top-content .links {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.releases-page .item .top-content .links a {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  font-size: 16px;
  color: #59f37b;
  transition: all .3s;
}

.releases-page .item .top-content .links a:hover{
  color: #fff;
}

.releases-page .item .top-content .links a:nth-child(1),
.releases-page .item .top-content .links a:nth-child(2) {
  font-size: 12px;
}

.releases-page .item .top-content .time {
  font-size: 12px;
  line-height: 19px;
  margin-bottom: 10px;
  color: #a9a9a9;
}

.releases-page .item .top-content .line {
  height: 1px;
  background: #262626;
  position: absolute;
  width: calc(100% - 210px);
  transition: all 0.3s;
  cursor: pointer;
}
.releases-page .item .top-content .line .progress {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}

.releases-page .item:hover .line {
  height: 6px;
}

.releases-page .item .date {
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.releases-page .item p {
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: #f0f0f0;
}
.releases-page .item .tags a {
  overflow: hidden;
  display: inline-block;
  padding: 1px;
  text-decoration: none;
  background: #333;
  border-radius: 15px 0px 0px 0px;
  margin-right: 5px;
}
.releases-page .item .tags a:hover {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}
.releases-page .item .tags a:last-child {
  margin-right: 0;
}
.releases-page .item .tags a span {
  display: block;
  background: #1c1c1c;
  padding: 11px 33px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #a9a9a9;
  border-radius: 15px 0px 0px 0px;
}
.releases-page .pages {
  text-align: center;
  padding-top: 30px;
}
.releases-page .pages a {
  display: inline-block;
  text-decoration: none;
  vertical-align: middle;
  color: #a9a9a9;
  font-size: 16px;
  width: 64px;
  height: 64px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 64px;
  border: 1px solid transparent;
  border-bottom: 2px solid transparent;
}
.releases-page .pages a.prev {
  background: url("../assets/prev2.svg") no-repeat center;
  border: 0 !important;
}
.releases-page .pages a.next {
  background: url("../assets/next2.svg") no-repeat center;
  border: 0 !important;
}

.releases-page .pages a.prev.disabled,
.releases-page .pages a.next.disabled {
  filter: grayscale(1);
  touch-action: none;
  pointer-events: none;
}

.releases-page .pages a.active {
  border-bottom: 2px solid #59f37b;
}
.releases-page .pages a:hover {
  border: 1px solid #a9a9a9;
  border-bottom: 2px solid #59f37b;
}

@media (max-width: 1320px) {
  .releases-page .item {
    width: 48%;
    margin-bottom: 70px;
  }
  .releases-page .item .top-content {
    padding: 70px 40px 50px 40px;
  }
  .releases-page .item .tags a span {
    padding: 11px 30px;
  }
  .releases-page {
    padding-bottom: 90px;
  }

  .releases-page .item .top-content .line {
    width: calc(100% - 80px);
  }
}

@media (max-width: 974px) {
  .releases-page .item {
    width: 100%;
  }
  .releases-page .item .tags {
    text-align: center;
  }
  .releases-page .item .top-content {
    padding: 70px 160px;
  }

  .releases-page .item .top-content .line {
    width: calc(100% - 320px);
  }
}

@media (max-width: 768px) {
  .releases-page .item .top-content {
    padding: 70px;
  }

  .releases-page .item .top-content .line {
    width: calc(100% - 140px);
  }
}

@media (max-width: 576px) {
  .releases-page .menu1 {
    text-align: center;
  }
  .releases-page .menu2 {
    display: none;
  }
  .releases-page .item .top-content {
    padding: 30px;
  }
  .releases-page .item .tags a span {
    padding: 11px 16px;
  }
  .releases-page .item {
    margin-bottom: 40px;
  }
  .releases-page .pages {
    padding: 0;
  }
  .releases-page {
    padding-bottom: 60px;
  }
  .releases-page .pages a {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .releases-page .item {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 20px 40px 20px;
  }
  .releases-page .item .top-content .image {
    min-height: 250px;
  }
  .releases-page .item .tags a span {
    padding: 10px 12px;
  }
  .releases-page .menu1 {
    width: 100%;
  }

  .releases-page .item .top-content .line {
    width: calc(100% - 60px);
  }
}
</style>
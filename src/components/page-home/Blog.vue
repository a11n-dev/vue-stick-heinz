<template>
  <div class="blog-block">
    <div class="wrap">
      <div class="block-name">{{ $t("blog.title") }}</div>

      <swiper
        :slides-per-view="slidesPerView"
        :space-between="20"
        :pagination="{ clickable: false }"
        class="list"
      >
        <swiper-slide v-for="post in blog.slice(0, 6)" :key="post.id">
          <div class="item">
            <div
              class="image"
              :style="
                'background: url(' +
                apiURL +
                '/api/blog/download/' +
                post.index +
                '/main)'
              "
            ></div>
            <div class="text">
              <div class="date">
                {{
                  new Date(post.created).toLocaleDateString("default", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </div>
              <router-link
                :to="`/${$i18n.locale}/blog/` + post.id"
                class="name"
                tabindex="0"
                >{{ post.title[getLangIndex(post.title)].value }}</router-link
              >
              <p>{{ post.intro[getLangIndex(post.intro)].value }}</p>
              <div class="views">{{ post.views }}</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Axios pack
import i18n from "@/i18n";
import { apiURL } from "../../helpers/utils";
import SwiperCore, { Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slidesPerView: 4,
      navigation: true,
      blog: [],
      apiURL,
    };
  },
  created() {
    this.getBlogPosts();
    this.windowResize();
    window.addEventListener("resize", this.windowResize);
  },
  methods: {
    getBlogPosts() {
      axios.get(this.apiURL + "/api/blog").then((response) => {
        this.blog = response.data.content;
      });
    },
    getLangIndex(array) {
      return array
        .map((e) => {
          return e.lang;
        })
        .indexOf(i18n.global.locale.toUpperCase());
    },
    windowResize() {
      if (window.innerWidth <= 1319.98 && window.innerWidth >= 768) {
        this.slidesPerView = 3;
      } else if (window.innerWidth <= 767.98 && window.innerWidth >= 576) {
        this.slidesPerView = 2;
      } else if (window.innerWidth <= 575.98) {
        this.slidesPerView = 1;
      } else {
        this.slidesPerView = 4;
      }
    },
  },
};
</script>

<style>
.blog-block {
  padding-bottom: 146px;
  position: relative;
  border-bottom: 1px solid #262626;
}
.blog-block:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -12px;
  width: 46px;
  height: 24px;
  background: url("../../assets/header.svg");
}
.blog-block .block-name {
  text-align: center;
  margin-bottom: 60px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.03em;
}
.blog-block .list {
  margin: 0 -10px 30px -10px;
}

.blog-block .item {
  border: 1px solid #333333;
}
.blog-block .item .image {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 290px;
  background-size: cover;
  background-position: center;
}
.blog-block .item .text {
  padding: 30px 20px 23px 30px;
}
.blog-block .item .text .date {
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-block .item .text .name {
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.4px;
  margin-bottom: 12px;
  transition: none;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-block .item .text .name:hover {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-block .item .text p {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.1px;
  min-height: 44px;
  color: #a9a9a9;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-block .item .text .views {
  font-size: 16px;
  color: #616161;
  padding: 2px 0 0 32px;
  background: url("../../assets/views.svg") no-repeat 0 0;
}
.blog-block .button {
  text-align: center;
  padding-top: 35px;
}
.blog-block .button button {
  color: #a9a9a9;
  background: #1c1c1c;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
  font-size: 16px;
  width: 180px;
  height: 70px;
  border: 1px solid #a9a9a9;
  border-bottom: 2px solid #59f37b;
}
.blog-block .button button:hover {
  color: #000;
  background: #59f37b;
  border: 1px solid #59f37b;
}

.swiper-container {
  display: flex;
  flex-direction: column;
}

.swiper-wrapper {
  order: 1;
}

.swiper-pagination {
  order: 2;
  position: relative;
  margin-top: 30px;
  text-align: center;
  transition: 0.3s opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}

.swiper-pagination-bullet {
  display: inline-block;
  padding: 0;
  font-size: 0;
  margin: 0 4px;
  opacity: 1;
  z-index: 2;
  width: 25px;
  height: 2px;
  border-radius: 0;
  background: #353535;
}

.swiper-pagination-bullet-active {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}

@media (max-width: 1320px) {
  .blog-block .button {
    padding-top: 70px;
  }
}

@media (max-width: 974px) {
  .blog-block .item .image {
    min-height: 230px;
  }
}

@media (max-width: 576px) {
  .blog-block .block-name {
    text-transform: uppercase;
    margin-bottom: 30px;
  }
  .blog-block .list {
    margin: 0 0px 30px 0;
  }

  .blog-block .button button {
    font-size: 14px;
    width: 118px;
    height: 48px;
  }
  .blog-block {
    padding-bottom: 80px;
  }
}
</style>
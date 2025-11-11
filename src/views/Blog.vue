<template>
  <div class="blog-page">
    <div class="wrap">
      <nav class="menu">
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
          :class="{ active: viewsSortMethod }"
          v-on:click.prevent="sortByViews()"
          ><span
            ><i>{{ $t("controls.sort.byViews") }}</i></span
          ></a
        >
      </nav>

      <div class="flex">
        <div class="item" v-for="post in blogPosts.slice(0, 2)" :key="post.id">
          <div class="badge" v-if="post.badge">NEW</div>
          <div
            class="image"
            :style="'background: #353535 url(' + post.image + ') no-repeat center;'"
          ></div>
          <div class="text">
            <div class="date">
              {{
                new Date(post.date).toLocaleDateString($i18n.locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </div>
            <router-link :to="`/${$i18n.locale}/blog/` + post.id" class="name">
              {{ post.title[$i18n.locale] || post.title.en }}
            </router-link>
            <p>
              {{ post.excerpt[$i18n.locale] || post.excerpt.en }}
            </p>
            <div class="views">{{ post.views }}</div>
          </div>
        </div>

        <div
          class="small-item"
          v-for="(post, index) in blogPosts.slice(2, 6)"
          :key="post.id"
        >
          <template v-if="index % 2 === 0">
            <div
              class="image"
              :style="'background: #353535 url(' + post.image + ') no-repeat center;'"
            ></div>
            <div class="text">
              <div class="date">
                {{
                  new Date(post.date).toLocaleDateString($i18n.locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </div>
              <router-link
                :to="`/${$i18n.locale}/blog/` + post.id"
                class="name"
              >
                {{ post.title[$i18n.locale] || post.title.en }}
              </router-link>
              <p>{{ post.excerpt[$i18n.locale] || post.excerpt.en }}</p>
              <div class="views">{{ post.views }}</div>
            </div>
          </template>

          <template v-else>
            <div class="text">
              <div class="date">
                {{
                  new Date(post.date).toLocaleDateString($i18n.locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </div>
              <router-link
                :to="`/${$i18n.locale}/blog/` + post.id"
                class="name"
              >
                {{ post.title[$i18n.locale] || post.title.en }}
              </router-link>
              <p>{{ post.excerpt[$i18n.locale] || post.excerpt.en }}</p>
              <div class="views">{{ post.views }}</div>
            </div>
            <div
              class="image"
              :style="'background: #353535 url(' + post.image + ') no-repeat center;'"
            ></div>
          </template>
        </div>

        <div class="item" v-for="post in blogPosts.slice(6, 8)" :key="post.id">
          <div class="badge" v-if="post.badge">NEW</div>
          <div
            class="image"
            :style="'background: #353535 url(' + post.image + ') no-repeat center;'"
          ></div>
          <div class="text">
            <div class="date">
              {{
                new Date(post.date).toLocaleDateString($i18n.locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </div>
            <router-link :to="`/${$i18n.locale}/blog/` + post.id" class="name">
              {{ post.title[$i18n.locale] || post.title.en }}
            </router-link>
            <p>
              {{ post.excerpt[$i18n.locale] || post.excerpt.en }}
            </p>
            <div class="views">{{ post.views }}</div>
          </div>
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

    <div class="tags">
      <template v-for="obj in blogPosts" :key="obj">
        <a href="" v-for="tag in obj.tags" :key="tag">
          <span>{{ tag.value[getLangIndex(tag.value)].value }}</span>
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import mockBlog from "../mocks/blog";

export default {
  name: "Blog",
  data() {
    return {
      blogPosts: [],
      dateSortMethod: true,
      viewsSortMethod: false,

      page: 0,
      perPage: 8,
      numberOfPages: null,
      pages: [],
    };
  },
  methods: {
    sortByDate: function () {
      const sorted = [...mockBlog].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return this.dateSortMethod ? dateB - dateA : dateA - dateB;
      });
      
      this.blogPosts = this.paginateData(sorted);
      this.dateSortMethod = !this.dateSortMethod;
    },
    sortByViews: function () {
      const sorted = [...mockBlog].sort((a, b) => {
        return this.viewsSortMethod 
          ? a.views - b.views 
          : b.views - a.views;
      });
      
      this.blogPosts = this.paginateData(sorted);
      this.viewsSortMethod = !this.viewsSortMethod;
    },
    getBlogPosts() {
      setTimeout(() => {
        const sorted = [...mockBlog].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        this.blogPosts = this.paginateData(sorted);
        this.numberOfPages = Math.ceil(mockBlog.length / this.perPage);
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

    setPages() {
      if (this.pages.length > 0) this.pages = [];

      for (let index = 1; index <= this.numberOfPages; index++) {
        this.pages.push(index);
      }
    },
  },
  created() {
    this.getBlogPosts();
  },
  watch: {
    blogPosts() {
      this.setPages();
    },
    page() {
      // Update data on page change
      this.getBlogPosts();
    },
  },
};
</script>

<style>
.blog-page {
  padding-bottom: 95px;
  border-bottom: 1px solid #2e2e2e;
}
.blog-page .menu {
  margin-bottom: 30px;
}
.blog-page .menu a {
  display: inline-block;
  text-decoration: none;
  margin-right: 18px;
  background: #333;
  padding: 1px;
  border-bottom: 1px solid #59f37b;
}
.blog-page .menu a:last-child {
  margin-right: 0;
}
.blog-page .menu a:hover,
.blog-page .menu a.active {
  border-bottom: 0;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}
.blog-page .menu a:hover span i {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-page .menu a span {
  display: block;
  padding: 15px 26px;
  background: #1c1c1c;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #a9a9a9;
}
.blog-page .menu a span i {
  font-style: normal;
}
.blog-page .item {
  margin-bottom: 50px;
  width: 48.8%;
  border: 1px solid #333333;
  position: relative;
}
.blog-page .item .badge {
  position: absolute;
  left: 0;
  top: 0;
  padding: 5px 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  color: #1c1c1c;
}
.blog-page .item .image {
  height: 465px;
}
.blog-page .item .text {
  padding: 30px;
}
.blog-page .item .text .date {
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-page .item .text .name {
  display: block;
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.4px;
  margin-bottom: 12px;
  transition: none;
}
.blog-page .item .text .name:hover {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-page .item .text p {
  margin-bottom: 56px;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.1px;
  color: #a9a9a9;
}
.blog-page .item .text .views {
  font-size: 16px;
  color: #616161;
  padding: 2px 0 0 32px;
  background: url("../assets/views.svg") no-repeat 0 0;
}
.blog-page .small-item {
  width: 23.4%;
  margin-bottom: 50px;
  border: 1px solid #333333;
}
.blog-page .small-item .image {
  min-height: 290px;
  background-size: cover;
  background-position: center;
}
.blog-page .small-item .text {
  padding: 30px 20px 23px 30px;
}
.blog-page .small-item .text .date {
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-page .small-item .text .name {
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.4px;
  margin-bottom: 12px;
  transition: none;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  min-height: 52px;
  overflow: hidden;
}
.blog-page .small-item .text .name:hover {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-page .small-item .text p {
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
.blog-page .small-item .text .views {
  font-size: 16px;
  color: #616161;
  padding: 2px 0 0 32px;
  background: url("../assets/views.svg") no-repeat 0 0;
}
.blog-page .pages {
  text-align: center;
  padding: 50px 0 60px;
}
.blog-page .pages a {
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
.blog-page .pages a.prev {
  background: url("../assets/prev2.svg") no-repeat center;
  border: 0 !important;
}
.blog-page .pages a.next {
  background: url("../assets/next2.svg") no-repeat center;
  border: 0 !important;
}

.blog-page .pages a.prev.disabled,
.blog-page .pages a.next.disabled {
  filter: grayscale(1);
  touch-action: none;
  pointer-events: none;
}

.blog-page .pages a.active {
  border-bottom: 2px solid #59f37b;
}
.blog-page .pages a:hover {
  border: 1px solid #a9a9a9;
  border-bottom: 2px solid #59f37b;
}
.blog-page .tags {
  text-align: center;
}
.blog-page .tags a {
  display: inline-block;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #a9a9a9;
  padding: 11px 26px;
  border: 1px solid #333333;
  border-radius: 15px 0px 0px 0px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px;
}
.blog-page .tags a:hover {
  background: #333333;
}
.blog-item-page {
  padding-bottom: 45px;
  border-bottom: 1px solid #2e2e2e;
}
.blog-item-page .top-image {
  height: 615px;
  margin-bottom: 48px;
  position: relative;
}
.blog-item-page .top-image .badge {
  position: absolute;
  left: 0;
  top: 0;
  padding: 5px 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  color: #1c1c1c;
}
.blog-item-page .text {
  padding: 0 150px;
}
.blog-item-page .text .date {
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-item-page .text h2 {
  margin-bottom: 35px;
  font-weight: bold;
  font-size: 32px;
  line-height: 26px;
  letter-spacing: -0.4px;
}
.blog-item-page .text p {
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  color: #f0f0f0;
  margin-bottom: 15px;
}
.blog-item-page .text p span {
  font-weight: 600;
}
.blog-item-page .text p a {
  color: #50a8e9;
}
.blog-item-page .text h3 {
  padding: 20px 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 26px;
  letter-spacing: -0.4px;
  clear: both;
}
.blog-item-page .text .img_l {
  width: 263px;
  float: left;
  margin: 0 24px 20px 0;
  font-size: 0;
}
.blog-item-page .text .img_l img {
  width: 100%;
}
.blog-item-page .text .img_l span {
  display: block;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: #a9a9a9;
  padding: 10px;
  border: 1px solid rgba(169, 169, 169, 0.3);
  border-top: 0;
}
.blog-item-page .text .img_r {
  width: 263px;
  float: right;
  margin: 0 0 20px 24px;
  font-size: 0;
}
.blog-item-page .text .img_r img {
  width: 100%;
}
.blog-item-page .text .img_r span {
  display: block;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: #a9a9a9;
  padding: 10px;
  border: 1px solid rgba(169, 169, 169, 0.3);
  border-top: 0;
}
.blog-item-page .text .bottom-info {
  padding: 45px 0 210px;
  border-bottom: 1px solid #262626;
}
.blog-item-page .text .bottom-info .counts span {
  display: inline-block;
  font-size: 16px;
  line-height: 24px;
  color: #616161;
  padding: 0 0 4px 40px;
  margin-right: 30px;
}
/* .blog-item-page .text .bottom-info .counts span:nth-child(1) {
  background: url("../assets/counts1.svg") no-repeat 0 0;
}
.blog-item-page .text .bottom-info .counts span:nth-child(2) {
  padding: 2px 0 2px 40px;
  background: url("../assets/counts2.svg") no-repeat 0 0;
}
.blog-item-page .text .bottom-info .counts span:nth-child(3) {
  background: url("../assets/counts3.svg") no-repeat 0 0;
} */
.blog-item-page .text .bottom-info .share {
  position: relative;
}
.blog-item-page .text .bottom-info .share:hover .links {
  display: block;
}
.blog-item-page .text .bottom-info .share .link {
  display: block;
  width: 32px;
  height: 32px;
  /* background: url("../assets/share.svg"); */
}
.blog-item-page .text .bottom-info .share .links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  width: 198px;
  height: 254px;
  /* background: url("../assets/sharebg.png"); */
  z-index: 2;
  margin-bottom: -30px;
  display: none;
}
.blog-item-page .text .bottom-info .share .links ul {
  padding: 25px 40px;
}
.blog-item-page .text .bottom-info .share .links ul li {
  margin-bottom: 12px;
}
.blog-item-page .text .bottom-info .share .links ul li a {
  display: block;
  text-decoration: none;
  font-size: 16px;
  line-height: 26px;
  color: #a9a9a9;
}
.blog-item-page .text .bottom-info .share .links ul li a img {
  vertical-align: middle;
  margin: -4px 6px 0 0;
}
.blog-item-page .text .form-link {
  padding-top: 42px;
}
.blog-item-page .text .form-link a {
  display: block;
  text-decoration: none;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.03em;
  /* background: url("../assets/plus.svg") no-repeat right; */
}

@media (max-width: 1320px) {
  .blog-page .item {
    width: 100%;
  }
  .blog-page .small-item,
  .blog-page .item {
    margin-bottom: 30px;
  }
  .blog-page .small-item {
    width: 48%;
  }
  .blog-page .pages {
    padding: 45px 0 50px;
  }
  .blog-page {
    padding-bottom: 85px;
  }
  .blog-item-page .text {
    padding: 0;
  }
  .blog-item-page .text .bottom-info {
    padding: 45px 0 100px;
    display: block;
    text-align: center;
  }
  .blog-item-page .text .bottom-info .counts {
    display: inline-block;
    vertical-align: middle;
  }
  .blog-item-page .text .bottom-info .share {
    display: inline-block;
    vertical-align: middle;
  }
}

@media (max-width: 974px) {
  .blog-item-page .top-image {
    height: 466px;
  }
  .blog-item-page .text .img_l,
  .blog-item-page .text .img_r {
    width: 204px;
  }
  .blog-item-page .text .img_l span {
    text-align: left;
    font-size: 12px;
    line-height: 14px;
  }
  .blog-item-page .text .img_r span {
    text-align: left;
    font-size: 12px;
    line-height: 14px;
  }
}

@media (max-width: 768px) {
  .blog-page .tags {
    display: none;
  }
  .blog-page .pages {
    padding: 45px 0 0 0;
  }
}

@media (max-width: 576px) {
  .blog-page .menu {
    text-align: center;
  }
  .blog-page .item .image {
    height: 220px;
  }
  .blog-page .item .text {
    padding: 20px 25px;
  }
  .blog-page .item .text p {
    margin-bottom: 20px;
  }
  .blog-page .small-item {
    width: 100%;
  }
  .blog-page .small-item .text {
    padding: 20px 25px;
  }
  .blog-page .small-item .text p {
    margin-bottom: 20px;
  }
  .blog-page .pages a {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  .blog-item-page .top-image {
    height: 220px;
  }
  .blog-item-page .text h2 {
    font-size: 24px;
    line-height: 30px;
  }
  .blog-item-page .text h2 {
    font-size: 20px;
    line-height: 26px;
  }
  .blog-item-page .text .img_l,
  .blog-item-page .text .img_r {
    float: none !important;
    width: auto;
    margin: 0 0 20px 0 !important;
  }
  .blog-item-page .text .bottom-info .counts span {
    margin-right: 20px;
  }

  .blog-page .small-item,
  .blog-page .item {
    margin-bottom: 45px;
  }
  .blog-item-page .text .bottom-info {
    padding: 40px 0;
  }
}
</style>
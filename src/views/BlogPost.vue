<template>
  <div class="blog-item-page">
    <div class="wrap">
      <div
        class="top-image"
        :style="'background: #353535 url(' + (post.image || '') + ') no-repeat center;'"
      >
        <div class="badge" v-if="post.badge">NEW</div>
      </div>
      <div class="text">
        <div class="date">
          {{
            post.date ? new Date(post.date).toLocaleDateString($i18n.locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) : ''
          }}
        </div>
        <h2 class="post-title">{{ post.title ? (post.title[$i18n.locale] || post.title.en) : '' }}</h2>

        <!-- Post content -->
        <div class="post-content" v-html="post.content ? (post.content[$i18n.locale] || post.content.en) : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import mockBlog from "../mocks/blog";

export default {
  name: "BlogPost",
  data() {
    return {
      post: {},
    };
  },
  methods: {
    getBlogPost() {
      // Use mock data
      setTimeout(() => {
        const postId = parseInt(this.$route.params.id);
        this.post = mockBlog.find(p => p.id === postId) || {};
      }, 100);
    },
    getLangIndex(array) {
      if (!array || !Array.isArray(array)) return 0;
      return array
        .map((e) => {
          return e.lang;
        })
        .indexOf(i18n.global.locale.value.toLowerCase());
    },
  },
  created() {
    this.getBlogPost();
  },
  watch: {
    $route() {
      this.getBlogPost();
    },
  },
};
</script>

<style>
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
  background: url("img/counts1.svg") no-repeat 0 0;
}
.blog-item-page .text .bottom-info .counts span:nth-child(2) {
  padding: 2px 0 2px 40px;
  background: url("img/counts2.svg") no-repeat 0 0;
}
.blog-item-page .text .bottom-info .counts span:nth-child(3) {
  background: url("img/counts3.svg") no-repeat 0 0;
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
  /* background: url("img/share.svg"); */
}
.blog-item-page .text .bottom-info .share .links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  width: 198px;
  height: 254px;
  /* background: url("img/sharebg.png"); */
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
  /* background: url("img/plus.svg") no-repeat right; */
}
/* .comment-block {
  background: url('img/comment-block.jpg') center / cover;
  padding: 175px 0;
  border-bottom: 1px solid #262626;
  display: none;
}
.comment-block .block-name {
  max-width: 350px;
  margin: 0 auto 44px auto;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.1px;
  color: #A9A9A9;
}
.comment-block .block-name span {
  display: block;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 14px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.03em;
}
.comment-block .flex {
  max-width: 760px;
  margin: 0 auto;
}
.comment-block .field {
  width: 44%;
  margin-bottom: 40px;
}
.comment-block .field.big {
  width: 100%;
}
.comment-block .field label {
  display: block;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 13px;
  line-height: 16px;
}
.comment-block .field input[type='text'] {
  width: 100%;
  font-size: 16px;
  background: none;
  border-bottom: 1px solid #323232;
  height: 40px;
}
.comment-block button {
  display: block;
  margin: 0 auto;
  color: #A9A9A9;
  background: #1C1C1C;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
  font-size: 16px;
  width: 180px;
  height: 70px;
  border: 1px solid #A9A9A9;
  border-bottom: 2px solid #59F37B;
}
.comment-block button:hover {
  color: #000;
  background: #59F37B;
  border: 1px solid #59F37B;
} */

@media (max-width: 1320px) {
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

@media (max-width: 576px) {
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

  .blog-item-page .text .bottom-info {
    padding: 40px 0;
  }
}
</style>
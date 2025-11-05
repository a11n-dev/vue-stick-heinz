<template>
  <div class="about-page">
    <div class="wrap">
      <h2>{{ $t("about.title") }}</h2>

      <div
        class="item"
        v-for="item in i18n.global.messages[i18n.global.locale].about.chronology"
        :key="item.id"
      >
        <div v-html="item.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "../i18n";
export default {
  name: "About",
  data() {
    return {
      i18n,
    };
  }
};
</script>

<style>
.about-page {
  border-bottom: 1px solid #2e2e2e;
  padding-bottom: 210px;
  background: url("../assets/about-page.jpg") no-repeat bottom center;
}
.about-page h2 {
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 24px;
  line-height: 26px;
  letter-spacing: -0.4px;
}
.about-page .item {
  padding: 40px 145px 100px 380px;
  position: relative;
}
.about-page .item:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
}
.about-page .item .date {
  position: absolute;
  left: 0;
  top: 40px;
  font-size: 16px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.about-page .item p {
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  color: #f0f0f0;
  margin-bottom: 15px;
}
.about-page .item p span {
  font-weight: 600;
}
.about-page .item p a {
  color: #50a8e9;
}
.about-page .item ul {
  padding-top: 20px;
}
.about-page .item ul li {
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}
.about-page .item ul li:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: linear-gradient(164.92deg, #59f37b 32.88%, #08d8f4 75.85%),
    #c4c4c4;
  left: 0;
  top: 9px;
}

@media (max-width: 1320px) {
  .about-page {
    padding-bottom: 60px;
  }
  .about-page .item {
    padding: 40px 0 60px;
  }
  .about-page .item .date {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    margin-bottom: 12px;
  }
}
</style>
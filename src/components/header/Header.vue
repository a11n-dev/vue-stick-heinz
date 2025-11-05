<template>
  <header class="header">
    <div class="wrap flex">
      <div class="logo">
        <router-link :to="`/${$i18n.locale}`"><img src="../../assets/logo.svg" /></router-link>
      </div>
      <nav>
        <Navigation />
        <div class="lang-select other">
          <a class="l" v-on:click="modalMixin.methods.langsPopup"></a>
          <a class="link"
            ><img src="../../assets/flag1.png" /> en <span></span
          ></a>
          <a class="link h"><img src="../../assets/flag2.png" /> ru</a>
        </div>
        <div class="menu-button" @click="mobileMeneToggle()"></div>
      </nav>
    </div>
  </header>
</template>

<script>
import Navigation from "./Navigation";

import { modalMixin } from "../../mixins";

export default {
  name: "Header",
  components: {
    Navigation,
  },
  data() {
    return {
      modalMixin,
    };
  },
  methods: {
    mobileMeneToggle() {
      document.getElementById("menubg").classList.toggle("fade-in");
      document.querySelector(".menu").classList.toggle("opened");
    },
  },
};
</script>

<style>
.header {
  border-bottom: 1px solid #2e2e2e;
  padding: 30px 0;
  background: #131313;
  position: relative;
}
.header:before {
  content: "";
  position: absolute;
  left: 20%;
  bottom: -12px;
  width: 46px;
  height: 24px;
  background: url("../../assets/header.svg");
  z-index: 2;
  opacity: 0;
}
.header .wrap {
  position: relative;
}
.header .wrap:before {
  content: "";
  position: absolute;
  left: 125px;
  bottom: -42px;
  width: 46px;
  height: 24px;
  background: url("../../assets/header.svg");
  z-index: 2;
}
.header nav {
  margin-top: 10px;
}
.header nav .menu-button {
  display: inline-block;
  cursor: pointer;
  width: 43px;
  height: 33px;
  background: url("../../assets/menu-button.svg") center / cover;
  vertical-align: middle;
  margin-left: 40px;
  margin-top: -2px;
  display: none;
}
.header nav ul {
  display: inline-block;
}
.header nav ul li {
  display: inline-block;
  margin-right: 35px;
}
.header nav ul li:nth-child(6) a:after {
  display: none;
}
.header nav ul li a {
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: #a9a9a9;
  transition: none;
  position: relative;
}
.header nav ul li a:after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 3px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #a9a9a9;
  right: -20px;
  opacity: 0.6;
}
.header nav ul li a:hover {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header nav .lang-select {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  width: 110px;
  height: 33px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  margin: -2px 0 0 46px;
  padding: 2px;
  position: relative;
}
.header nav .lang-select .l {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.header nav .lang-select .link {
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  height: 28px;
  line-height: 28px;
  padding: 0 15px;
  background: #1c1c1c;
}
.header nav .lang-select .link.h {
  position: absolute;
  top: 100%;
  left: 0;
  border: 2px solid #59f37b;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-top: 0;
  display: none;
}
.header nav .lang-select .link span {
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  background: url("../../assets/arrow.svg");
  margin-left: 10px;
}
.header nav .lang-select .link img {
  vertical-align: middle;
  margin: -2px 6px 0 0;
}

.menubg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(1, 1, 1, 0.7);
  z-index: 11;
  display: none;
}
.header nav .lang-select.other {
  width: 49px;
  height: 33px;
  background: url("../../assets/langs.svg");
}
.header nav .lang-select.other .l {
  display: block;
}
.header nav .lang-select.other .link {
  display: none;
}

@media (max-width: 974px) {
  .header .wrap {
    position: static;
  }
  .header nav ul {
    position: absolute;
    width: 250px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    top: 0;
    right: 0;
    background: #1c1c1c;
    padding: 40px 25px;
    box-shadow: 0px 16px 31px #000000;
    z-index: 12;
    display: none;
  }
  .header nav ul.opened {
    display: block;
  }
  .header nav ul li {
    display: block;
    margin: 0 0 20px 0;
  }
  .header nav ul .close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 18px;
    height: 18px;
    background: url("../../assets/close.svg");
  }
  .header nav ul .social {
    border: 1px solid #4e4e4e;
    border-right: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 0;
    margin-top: 100px;
  }
  .header nav ul .social a {
    width: 33.33334%;
    text-align: center;
    height: 54px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid #4e4e4e;
  }
  .header nav ul .social a:nth-child(1) {
    background: url("../../assets/social1.svg") no-repeat center;
  }
  .header nav ul .social a:nth-child(2) {
    background: url("../../assets/social2.svg") no-repeat center;
  }
  .header nav ul .social a:nth-child(3) {
    background: url("../../assets/social3.svg") no-repeat center;
  }
  .header nav .menu-button {
    display: inline-block;
  }
  .header nav ul li a:after {
    display: none;
  }
  .header .wrap:before {
    display: none;
  }
  .header:before {
    opacity: 1;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 12px 0;
  }
  .header .logo {
    width: 48px;
  }
  .header nav .menu-button {
    width: 32px;
    height: 24px;
    margin-left: 24px;
  }
  .header:before {
    zoom: 0.8;
  }
  .header nav {
    margin-top: 3px;
  }
  .header nav ul{
    width: 100%;
    height: 100vh;
  }
  .header nav ul li a{
    font-size: 24px;
  }
  .header nav ul .social{
    margin-top: 50px;
  }
  .header nav .lang-select .link img {
    zoom: 0.8;
  }
  .header nav .lang-select {
    width: 95px;
  }
  .header nav .lang-select .link {
    padding: 0 12px;
  }
  .header nav .lang-select .link span {
    margin-left: 6px;
  }
}
</style>
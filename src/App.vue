<template>
  <div id="app">
    <PopupLangs />
    <div id="menubg" v-on:click="langsPopup"></div>
    <Header />

    <Breadcrumbs v-if="layout == 'internal'" />

    <router-view />

    <Footer />
    <Copyright />
  </div>
</template>

<script>


import PopupLangs from "./components/header/PopupLangs";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Copyright from "./components/footer/Copyright";

import Breadcrumbs from "./components/Breadcrumbs";

import { modalMixin } from "./mixins";

export default {
  name: "App",
  data() {
    return {
      modalMixin,
      layout: this.$route.meta.layout,
    };
  },
  components: {
    Header,
    PopupLangs,
    Footer,
    Copyright,
    Breadcrumbs,
  },
  watch: {
    $route (){
      this.layout = this.$route.meta.layout;
    }
  }
};
</script>

<style>
/* Font */
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

/* FontAwesome */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

.up {
  text-transform: uppercase;
}
.none {
  text-decoration: none;
}
.th {
  font-weight: 100;
}
.el {
  font-weight: 200;
}
.l {
  font-weight: 300;
}
.reg {
  font-weight: 400;
}
.med {
  font-weight: 500;
}
.sb {
  font-weight: 600;
}
.bold {
  font-weight: 700;
}
.eb {
  font-weight: 800;
}
.black {
  font-weight: 900;
}
.un {
  text-decoration: underline;
}
.in {
  display: inline-block;
}
.vam {
  vertical-align: middle;
}
.rel {
  position: relative;
}
.bl {
  display: block;
}
.abs {
  position: absolute;
}
.tr {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.try {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.trx {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.tc {
  display: table-cell;
  vertical-align: middle;
}
.dn {
  display: none;
}
.tac {
  text-align: center;
}
.tal {
  text-align: left;
}
.tar {
  text-align: right;
}
.taj {
  text-align: justify;
}
.it {
  font-style: italic;
}
.sn {
  font-style: normal;
}
.popup {
  position: fixed;
  width: 120%;
  height: 100%;
  left: -10%;
  top: 0;
  overflow-y: scroll;
  background: rgba(1, 1, 1, 0.7);
  z-index: 11;
  display: none;
}
.b0 {
  border: 0;
}
.bn {
  background: none;
}
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
.wa {
  width: auto;
}
.p0 {
  padding: 0;
}
.m0 {
  margin: 0;
}
.poi {
  cursor: pointer;
}
.auto {
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
}
.noup {
  text-transform: none;
}
.fix {
  position: fixed;
}
.tn {
  transform: none;
}
.bf {
  background: #fff;
}
.cf {
  color: #fff;
}
.c0 {
  color: #000;
}
.ap {
  appearance: none;
}
.nw {
  white-space: nowrap;
}
.ma {
  margin: 0 auto;
}
.oh {
  overflow: hidden;
}
body,
html {
  width: 100%;
  height: 100%;
}
body {
  background: #1c1c1c;
  overflow-x: hidden;
}
body,
th,
td {
  font-family: "IBM Plex Sans";
  font-size: 14px;
  color: #fff;
}
body,
form,
object,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}
img,
table {
  border: none;
}
table {
  border-collapse: collapse;
}
table td {
  padding: 0;
}
a {
  color: #fff;
  cursor: pointer;
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}
a:hover {
  text-decoration: none;
}
input,
textarea,
button,
select {
  margin: 0;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
  border: 0;
  font-family: "IBM Plex Sans";
}
button,
input[type="submit"] {
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
  cursor: pointer;
  border: 0;
}
ol,
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
img {
  max-width: 100%;
}
.an {
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}
.box {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
section,
header,
footer,
nav,
main {
  display: block;
}
.wrap {
  margin: 0 auto;
  width: 1290px;
}
* {
  outline: none !important;
}
.flex {
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
}
.grbg {
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#menubg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(1, 1, 1, 0.7);
  z-index: 11;
  display: none;
  transition: opacity 1s;
  opacity: 0;
}

#menubg.fade-in {
  display: block;
  animation: fadeIn ease 0.5s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 1320px) {
  .wrap {
    width: 944px;
  }
}

@media (max-width: 974px) {
  .wrap {
    width: 688px;
  }
}

@media (max-width: 768px) {
  .wrap {
    width: 556px;
  }
}

@media (max-width: 576px) {
  .wrap {
    width: auto;
    padding: 0 10px;
  }
}

/* Google recaptcha */

.grecaptcha-badge{
  z-index: 999;
}
</style>

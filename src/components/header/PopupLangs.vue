<template>
  <div class="popup-langs">
    <a class="close" v-on:click="langsPopup"></a>
    <p>{{ $t("lang.title") }}</p>
    <ul>
      <li @click.prevent="setLocale('ru')"><a href="#"><img src="../../assets/flag2.png"> РУССКИЙ</a></li>
      <li @click.prevent="setLocale('en')"><a href="#"><img src="../../assets/flag1.png"> ENGLISH</a></li>
    </ul>
  </div>
</template>

<script>
import router from '@/router'
import i18n from '@/i18n'
import { modalMixin } from "../../mixins";

export default {
  name: 'PopupLangs',
  mixins: [modalMixin],
  methods: {
    setLocale: function(locale) {
      // Correct way to set locale for Composition API (legacy: false)
      i18n.global.locale.value = locale
      
      // Get current path without language
      const currentPath = this.$route.path
      const pathWithoutLang = currentPath.replace(/^\/(en|ru)/, '')
      
      // Form new path with new language
      const newPath = `/${locale}${pathWithoutLang || ''}`
      
      // Navigate to new path
      router.push(newPath)
      
      // Close popup
      this.langsPopup()
    }
  }
}
</script>

<style>
  .popup-langs {
    position: fixed;
    top: 55px;
    width: 90%;
    left: 50%;
    background: #1C1C1C;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(169, 169, 169, 0.3);
    box-shadow: 0px 16px 31px #000000;
    text-align: center;
    padding: 54px;
    z-index: 12;
    display: none;
    max-width: 400px;
    transform: translateX(-50%);
  }
  .popup-langs.opened {
    display: block;
  }
  .popup-langs .close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 18px;
    height: 18px;
    background: url('../../assets/close2.svg');
  }
  .popup-langs p {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #A9A9A9;
    margin-bottom: 18px;
  }
  .popup-langs ul li {
    border-bottom: 1px solid #2E2E2E;
  }
  .popup-langs ul li:last-child {
    border-bottom: 0;
  }
  .popup-langs ul li a {
    display: block;
    text-decoration: none;
    padding: 15px 0;
  }
  .popup-langs ul li a img {
    vertical-align: middle;
    margin: -2px 6px 0 0;
  }
</style>
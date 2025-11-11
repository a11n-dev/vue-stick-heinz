<template>
  <ul class="menu">
    <a class="close" @click="mobileMeneToggle()"></a>
    <li>
      <router-link :to="`/${$i18n.locale}`" @click="closeMenu()">{{
        $t("header.navigation.home")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/blog`" @click="closeMenu()">{{
        $t("header.navigation.blog")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/releases`" @click="closeMenu()">{{
        $t("header.navigation.releases")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/contacts`" @click="closeMenu()">{{
        $t("header.navigation.contact")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/about`" @click="closeMenu()">{{
        $t("header.navigation.about")
      }}</router-link>
    </li>

    <div class="social">
      <a href="https://www.youtube.com" target="_blank"></a>
      <a href="https://soundcloud.com" target="_blank"></a>
      <a href="https://www.spotify.com/" target="_blank"></a>
    </div>
  </ul>
</template>

<script>
// import i18n from "@/i18n";

export default {
  name: "Navigation",
  methods: {
    mobileMeneToggle() {
      const menubg = document.getElementById("menubg");
      const menu = document.querySelector(".menu");
      
      if (menu.classList.contains("opened")) {
        // Закрываем
        menu.classList.remove("opened");
        menubg.classList.remove("fade-in");
      } else {
        // Открываем
        menu.classList.add("opened");
        menubg.classList.add("fade-in");
      }
    },
    closeMenu() {
      // Всегда закрываем меню при клике на ссылку
      const menubg = document.getElementById("menubg");
      const menu = document.querySelector(".menu");
      menu.classList.remove("opened");
      menubg.classList.remove("fade-in");
    },
  },
};
</script>

<style>
</style>
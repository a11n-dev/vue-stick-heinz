<template>
  <ul class="menu">
    <a class="close" @click="mobileMeneToggle()"></a>
    <li>
      <router-link :to="`/${$i18n.locale}`" @click="mobileMeneToggle()">{{
        $t("header.navigation.home")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/blog`" @click="mobileMeneToggle()">{{
        $t("header.navigation.blog")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/releases`" @click="mobileMeneToggle()">{{
        $t("header.navigation.releases")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/contacts`" @click="mobileMeneToggle()">{{
        $t("header.navigation.contact")
      }}</router-link>
    </li>
    <li>
      <router-link :to="`/${$i18n.locale}/about`" @click="mobileMeneToggle()">{{
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
      document.getElementById("menubg").classList.toggle("fade-in");
      document.querySelector(".menu").classList.toggle("opened");
    },
  },
};
</script>

<style>
</style>
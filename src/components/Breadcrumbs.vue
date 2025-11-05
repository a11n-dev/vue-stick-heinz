<template>
  <div class="page-name">
    <div class="wrap">
      <h1>{{ breadCrumbTitle[getLangIndex(breadCrumbTitle)].value }}</h1>
      <div class="navi">
        <router-link :to="`/`">{{ $t("header.navigation.home") }}</router-link>
        <i class="fa fa-angle-right"></i> {{ breadCrumbTitle[getLangIndex(breadCrumbTitle)].value }}
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n'

export default {
  name: "Breadcrumbs",
  data() {
    return {
      breadCrumbTitle: this.$route.meta.breadCrumbTitle,
    };
  },
  methods: {
    getLangIndex(array) {
      return array
        .map((e) => {
          return e.lang;
        })
        .indexOf(i18n.global.locale.toLowerCase());
    },
  },
  watch: {
    $route() {
      this.breadCrumbTitle = this.$route.meta.breadCrumbTitle;
    },
  },
};
</script>

<style>
.page-name {
  padding: 114px 0 20px;
  text-align: center;
  margin-bottom: 120px;
  background: url("../assets/page-name.png");
}
.page-name.other {
  margin-bottom: 0;
}
.page-name h1 {
  margin-bottom: 75px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
}
.page-name .navi {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  letter-spacing: 0.03em;
  color: #a9a9a9;
}
.page-name .navi a {
  text-decoration: none;
  color: #4d4c4c;
}
.page-name .navi .fa {
  font-size: 18px;
  color: #4d4c4c;
  vertical-align: middle;
  margin: -4px 18px 0 18px;
}

@media (max-width: 576px) {
  .page-name {
    padding: 70px 0 15px;
    /* background: none; */
  }
  .page-name h1 {
    margin-bottom: 60px;
    text-transform: uppercase;
  }
  .page-name .navi {
    font-size: 12px;
    line-height: 24px;
  }
  .page-name .navi .fa {
    margin: 0 5px;
    zoom: 0.8;
    margin-top: -3px;
  }
  .page-name {
    margin-bottom: 50px;
  }
}
</style>
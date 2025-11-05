<template>
  <div class="index-first-block">
    <div class="wrap">
      <div class="text">
        <div class="block-name">{{ $t("indexFirtsBlock.welcome") }}</div>
        <p v-html="$t('indexFirtsBlock.introText')"></p>

        <a href="#go-order" class="btn">{{ $t("indexFirtsBlock.btnText") }}</a>
      </div>
      <div class="social">
        <a href="https://www.youtube.com" target="_blank"
          ><span></span> youtube</a
        >
        <a href="https://soundcloud.com" target="_blank"
          ><span></span> soundcloud</a
        >
        <a href="https://www.spotify.com/" target="_blank"
          ><span></span> spotify</a
        >
      </div>
      <div class="player">
        <div class="content">
          <p class="last-release"></p>
          <div class="links">
            <a v-show="!isPlaying" @click="play(lastRelease[0])"
              ><font-awesome-icon :icon="['fa', 'play']"
            /></a>
            <a v-show="isPlaying" @click="pause"
              ><font-awesome-icon :icon="['fa', 'pause']"
            /></a>
            <a v-show="clickCounter == 0" @click="sound"
              ><font-awesome-icon :icon="['fa', 'volume-up']"
            /></a>
            <a v-show="clickCounter == 1" @click="sound"
              ><font-awesome-icon :icon="['fa', 'volume-down']"
            /></a>
            <a v-show="clickCounter == 2" @click="sound"
              ><font-awesome-icon :icon="['fa', 'volume-mute']"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <a href="#releases" class="bottom-link"></a>
  </div>
</template>

<script>
import axios from "axios"; // Axios pack
import { audioMixin } from "../../mixins";
import { apiURL, threatSongs } from "../../helpers/utils";

export default {
  name: "IndexFirstBlock",
  data() {
    return {
      lastRelease: null,
    };
  },
  created() {
    this.getLastRelease();
  },
  methods: {
    getLastRelease() {
      axios.get(apiURL + "/api/release").then((response) => {
        this.lastRelease = response.data.content;
        this.lastRelease = threatSongs(this.lastRelease);
        this.sortByDate();

        document.querySelector(
          ".last-release"
        ).innerHTML = this.lastRelease[0].track;
      });
    },
    sortByDate: function () {
      this.lastRelease = this.lastRelease
        .slice()
        .sort((a, b) => new Date(b.created) - new Date(a.created));
    },
  },
  mixins: [audioMixin],
};
</script>

<style>
.index-first-block {
  background: url("../../assets/index-first-block.jpg") no-repeat bottom center;
  border-bottom: 1px solid #262626;
  padding: 267px 0 160px;
  position: relative;
}
.index-first-block:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -12px;
  width: 46px;
  height: 24px;
  background: url("../../assets/header.svg");
}
.index-first-block .wrap {
  position: relative;
}
.index-first-block .social {
  position: absolute;
  right: 0;
  bottom: 190px;
  width: 230px;
  background: rgba(39, 39, 39, 0.3);
  border: 1px solid #4e4e4e;
}
.index-first-block .social a {
  display: block;
  text-decoration: none;
  height: 54px;
  line-height: 54px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #4e4e4e;
  padding: 0 28px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
  letter-spacing: 0.03em;
}
.index-first-block .social a:nth-child(1) span {
  background: url("../../assets/social1.svg") no-repeat center;
}
.index-first-block .social a:nth-child(2) span {
  background: url("../../assets/social2.svg") no-repeat center;
}
.index-first-block .social a:nth-child(3) {
  border-bottom: 0;
}
.index-first-block .social a:nth-child(3) span {
  background: url("../../assets/social3.svg") no-repeat center;
}
.index-first-block .social a span {
  display: inline-block;
  vertical-align: middle;
  margin: -2px 12px 0 0;
  width: 33px;
  height: 33px;
}
.index-first-block .text {
  margin-bottom: 126px;
}
.index-first-block .text .block-name {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 70px;
  line-height: 77px;
  margin-bottom: 7px;
  position: relative;
}
.index-first-block .text .block-name:before {
  content: "";
  position: absolute;
  width: 78px;
  height: 78px;
  background: url("../../assets/wellcome.png");
  left: -30px;
  top: -30px;
}
.index-first-block .text p {
  margin-bottom: 50px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.03em;
  color: #a9a9a9;
}
.index-first-block .text a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #a9a9a9;
  background: #1c1c1c;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
  font-size: 16px;
  width: 308px;
  height: 70px;
  border: 1px solid #a9a9a9;
  border-bottom: 2px solid #59f37b;
}
.index-first-block .text a:hover {
  color: #000;
  background: #59f37b;
  border-color: #59f37b;
}
.index-first-block .player {
  border: 1px solid #4e4e4e;
  height: 64px;
  line-height: 64px;
  text-align: center;
  position: relative;
}

.index-first-block .player .links {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;
}
.index-first-block .player .links a {
  margin-right: 15px;
  vertical-align: middle;
  display: inline-block;
  font-size: 16px;
  transition: all .3s;
  color: #59f37b;
}

.index-first-block .player .links a :hover{
  color: #fff;
}

.index-first-block .player .links a:nth-child(1),
.index-first-block .player .links a:nth-child(2) {
  font-size: 14px;
}

.index-first-block .player p {
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.03em;
  z-index: 999;
}
.index-first-block .bottom-link {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  width: 16px;
  height: 16px;
  background: url("../../assets/arrow2.svg");
}

@media (max-width: 1320px) {
  .index-releases .list .slick-prev {
    margin-left: -250px;
  }
  .index-releases .list .slick-next {
    margin-right: -250px;
  }
}

@media (max-width: 974px) {
  .index-first-block {
    background: url("../../assets/index-first-block2.jpg") bottom center / cover;
  }
  .index-first-block .social {
    width: auto;
    bottom: 190px;
  }
  .index-first-block .social a {
    font-size: 0;
    width: 70px;
    padding: 0;
    text-align: center;
    display: inline-block;
    border-bottom: 0;
    border-right: 1px solid #4e4e4e;
    height: 70px;
    line-height: 70px;
  }
  .index-first-block .social a:last-child {
    border-right: 0;
  }
  .index-first-block .social a span {
    margin: 0;
  }
}

@media (max-width: 576px) {
  .index-first-block {
    padding: 100px 0 115px;
  }
  .index-first-block .text .block-name {
    font-size: 32px;
    line-height: 77px;
  }
  .index-first-block .text .block-name:before {
    zoom: 0.6;
    top: -30px;
  }
  .index-first-block .text p {
    margin-bottom: 32px;
    font-size: 16px;
    line-height: 24px;
    padding-right: 80px;
  }
  .index-first-block .text button {
    display: block;
    margin: 0 auto;
    width: 210px;
    height: 48px;
    font-size: 14px;
  }
  .index-first-block .social {
    right: -1px;
    bottom: 215px;
    background: #1c1c1c;
  }
  .index-first-block .text .block-name {
    margin-bottom: 10px;
    line-height: 36px;
  }
  .index-first-block .social a {
    display: block;
    border-bottom: 1px solid #4e4e4e;
    width: 46px;
    height: 46px;
    line-height: 46px;
    border-right: 0;
  }
  .index-first-block .text {
    margin-bottom: 66px;
    padding-left: 20px;
  }
  .index-first-block .bottom-link {
    bottom: 50px;
  }

  .index-first-block .player .links {
    left: 15px;
  }
}
</style>
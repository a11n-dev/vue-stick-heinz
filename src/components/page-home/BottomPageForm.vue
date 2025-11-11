<template>
  <div class="bottom-page-form" id="go-order">
    <div class="wrap">
      <div class="block-name">
        <span>{{ $t('contactForm.title') }}</span>
        {{ $t('contactForm.text') }}
      </div>
      <form @submit.prevent="onSubmit">
        <div class="flex">
          <div class="field">
            <label>{{ $t('contactForm.inputs.name.label') }}</label>
            <input
              type="text"
              name="name"
              v-model="name"
              :placeholder="$t('contactForm.inputs.name.placeholder')"
              required
            />
            <div class="error-text"></div>
          </div>
          <div class="field">
            <label>{{ $t('contactForm.inputs.email.label') }}</label>
            <input
              type="email"
              name="email"
              v-model="email"
              :placeholder="$t('contactForm.inputs.email.placeholder')"
              required
            />
            <div class="error-text"></div>
          </div>
          <div class="field big">
            <label>{{ $t('contactForm.inputs.message.label') }}</label>
            <textarea
              :placeholder="$t('contactForm.inputs.message.placeholder')"
              cols="20"
              rows="2"
              name="message"
              v-model="message"
              required
            ></textarea>
          </div>
        </div>

        <input type="submit" :value="$t('contactForm.inputs.btnText')" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomPageForm",
  data() {
    return {
      name: null,
      email: null,
      message: null,
      reCaptcha: null,
    };
  },
  methods: {
    onSubmit() {
      // Form stub - just show alert
      if (this.name && this.email && this.message) {
        alert('Спасибо за сообщение! (это демо-режим, сообщение не отправлено)');
        this.name = null;
        this.email = null;
        this.message = null;
      } else {
        alert('Пожалуйста, заполните все поля');
      }
    },
  },
};
</script>

<style>
.bottom-page-form {
  background: url("../../assets/bottom-page-form.jpg") no-repeat bottom center;
  padding: 155px 0 200px;
  border-bottom: 1px solid #2e2e2e;
}
.bottom-page-form .block-name {
  max-width: 350px;
  margin: 0 auto 44px auto;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.1px;
  color: #a9a9a9;
}
.bottom-page-form .block-name span {
  display: block;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 14px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.03em;
}
.bottom-page-form .flex {
  max-width: 760px;
  margin: 0 auto;
}
.bottom-page-form .field {
  width: 44%;
  margin-bottom: 40px;
  position: relative;
}
.bottom-page-form .field.big {
  width: 100%;
}
.bottom-page-form .field .error-text {
  position: absolute;
  left: 0;
  bottom: -25px;
  color: #e94141;
}
.bottom-page-form .field label {
  display: block;
  background: linear-gradient(180deg, #59f37b 0%, #08d8f4 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 13px;
  line-height: 16px;
}
.bottom-page-form .field input {
  width: 100%;
  font-size: 16px;
  background: none;
  border-bottom: 1px solid #323232;
  height: 40px;
  color: #fff;
}
.bottom-page-form .field input.error {
  background: url("../../assets/error.svg") no-repeat right;
}
.bottom-page-form .field textarea {
  width: 100%;
  font-size: 16px;
  background: none;
  border-bottom: 1px solid #323232;
  height: 240px;
  padding: 10px 0;
  color: #fff;
}
.bottom-page-form input[type="submit"] {
  display: block;
  margin: 0 auto;
  color: #a9a9a9;
  background: #1c1c1c;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
  font-size: 16px;
  width: 180px;
  height: 70px;
  border: 1px solid #a9a9a9;
  border-bottom: 2px solid #59f37b;
  -webkit-appearance: none;
}
.bottom-page-form input[type="submit"]:hover {
  color: #000;
  background: #59f37b;
  border: 1px solid #59f37b;
}

@media (max-width: 576px) {
  .bottom-page-form {
    padding: 80px 0 95px;
  }
  .bottom-page-form .field {
    width: 100%;
  }
  .bottom-page-form .field .error-text {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    transform: none;
    margin-top: 5px;
  }
  .bottom-page-form .flex {
    padding: 0 20px;
  }
}
</style>
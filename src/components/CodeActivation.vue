<template>
  <section class="section">
    <div class="logo">
      <img src="/img/logo.png" alt="logo" class="image" />
    </div>
    <div class="section__body">
      <Transition mode="out-in">
        <div class="button-wrapper" v-if="!isKeyVisible">
          <Button @click="getKey" />
        </div>
        <div v-else>
          <Transition mode="out-in">
            <div class="error" v-if="!isSuccess">
              <p class="text center">Oops...</p>
              <!-- <Button @click="getKey" /> -->
              <p class="text center">no more codes left</p>
            </div>
            <div class="success" v-else-if="isSuccess">
              <p class="text center">congratulations</p>
              <div class="success-bg">
                <img src="/img/cars.png" alt="cars" class="image" />
              </div>
              <div class="code-text">
                <p class="text">your activation</p>
                <div class="d-flex align-center code__body">
                  <p class="text">code is</p>
                  <Code />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </section>
</template>
<script setup>
  import { ref } from 'vue';
  import Code from '@/components/Code.vue';
  import Button from '@/components/Button.vue';
  import { useReCaptcha } from 'vue-recaptcha-v3';

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

  const recaptcha = async () => {
    // (optional) Wait until recaptcha has been loaded.
    await recaptchaLoaded();

    // Execute reCAPTCHA with action "login".
    const token = await executeRecaptcha('login');

    // Do stuff with the received token.

    // console.log(token);

    if (token.length) {
      isKeyVisible.value = true;
      if (localStorage.getItem('userCanGetKey') === 'false') {
        isSuccess.value = false;
        localStorage.setItem('userCanGetKey', 'true');
      } else {
        isSuccess.value = true;
        localStorage.setItem('userCanGetKey', 'false');
      }
    }
  };

  const isSuccess = ref(false);

  const isKeyVisible = ref(false);

  const getKey = () => {
    recaptcha();
  };
</script>
<style scoped>
  .section {
    min-height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 40px;
  }
  .logo {
    margin-top: 100px;
    pointer-events: none;
    user-select: none;
    width: 709px;
  }
  .section__body {
    margin-top: 60px;
  }
  .text.center {
    text-align: center;
  }
  .success {
    position: relative;
  }
  .success-bg {
    user-select: none;
    pointer-events: none;
    position: relative;
    margin-top: 30px;
    z-index: 0;
  }
  .success-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(to right, #000 15%, rgba(0, 0, 0, 0));
  }
  .success-bg::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(to left, #000 15%, rgba(0, 0, 0, 0));
  }
  .code-text {
    margin: 0 auto;
    margin-top: -220px;
    position: relative;
    z-index: 1;
    width: fit-content;
  }
  .button-wrapper {
    margin-top: 100px;
  }
  .button {
    margin: 30px auto;
  }

  @media (max-width: 1200px) {
    .logo {
      width: 600px;
    }
    .code-text {
      margin-top: -180px;
    }
  }
  @media (max-width: 992px) {
    .logo {
      width: 500px;
    }
    .code-text {
      margin-top: -130px;
    }
  }
  @media (max-width: 768px) {
    .logo {
      width: 400px;
    }
    .code-text {
      margin-top: -100px;
    }
    .section {
      padding: 0 20px;
    }
    .success-bg::after {
      width: 100px;
    }
    .success-bg::before {
      width: 100px;
    }
  }
  @media (max-width: 556px) {
    .logo {
      width: 80%;
    }
    .code-text {
      margin-top: 100px;
    }
    .code__body {
      flex-direction: column;
    }
  }
</style>
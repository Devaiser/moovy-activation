<template>
  <section class="section">
    <a href="https://moovy.io/" target="_blank" class="logo">
      <img src="/img/logo.png" alt="logo" class="image" />
    </a>
    <div class="section__body">
      <Transition mode="out-in">
        <div class="button-wrapper" v-if="!isKeyVisible">
          <Transition mode="out-in">
            <TheButton @click="onButtonClick" v-if="!isCaptchaVisible" />
            <vue-recaptcha
              v-else
              sitekey="6LfDjbUkAAAAALS5fFbF619Cu869o-Y_PFCxPuCu"
              ref="recaptcha"
              @verify="onRecaptchaVerify"
            ></vue-recaptcha>
          </Transition>
          <div class="loading" v-if="isLoading">
            <img src="/img/loading.svg" alt="loading" class="image" />
          </div>
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
                  <TheCode :activationKey="activationKey" />
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
import TheCode from '@/components/TheCode.vue';
import TheButton from '@/components/TheButton.vue';
import { VueRecaptcha } from 'vue-recaptcha';

const url = 'https://moovy-backend-dev.up.railway.app';

const isLoading = ref(false);

const recaptcha = ref(null);

const activationKey = ref(null);

const isCaptchaVisible = ref(false);

const gameId = ref(null);

const onButtonClick = async () => {
  isCaptchaVisible.value = true;
};

const onRecaptchaVerify = async () => {
  isLoading.value = true;
  await fetch(`${url}/api/games/moovy`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === 'Success') {
        gameId.value = res.data.id;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  await fetch(`${url}/api/activation-code/generate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameId: gameId.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      activationKey.value = res.data.code;
      console.log('key', activationKey.value);
      isSuccess.value = true;
      isKeyVisible.value = true;
    })
    .catch((err) => {
      console.log(err);
      isKeyVisible.value = true;
      isSuccess.value = false;
    })
    .finally(() => (isLoading.value = false));
};

const isSuccess = ref(false);

const isKeyVisible = ref(false);
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
  user-select: none;
  width: 709px;
  display: block;
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

.loading {
  width: 100px;
  margin: 0 auto;
  margin-top: 20px;
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

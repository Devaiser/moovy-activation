<template>
  <div class="code">
    <div class="copy" @click="copy(source)">
      <div v-if="isSupported">
        <Transition mode="out-in">
          <div class="copy__icon checked" v-if="copied">
            <img src="/img/check.svg" alt="copy-icon" class="image" />
          </div>
          <div class="copy__icon" v-else>
            <img src="/img/copy.svg" alt="copy-icon" class="image" />
          </div>
        </Transition>
      </div>
    </div>
    <div class="code__body">
      <div class="code__logo">
        <img src="/img/number-logo.svg" alt="number-logo" />
      </div>
      <div class="digits-list">
        <p>55434</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { useClipboard } from '@vueuse/core';

  const source = ref('55434');
  const { copy, copied, isSupported } = useClipboard({
    source,
    copiedDuring: 3000,
    legacy: true,
  });
</script>
<style scoped>
  .code {
    border: 4px #1a1a1a solid;
    border-radius: 8px;
    height: 60px;
    box-sizing: border-box;
    width: 270px;
    overflow: hidden;
    display: flex;
    margin-left: 20px;
  }
  .copy {
    width: 61px;
    height: 100%;
    background: #62c0c0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  .copy img {
    user-select: none;
    pointer-events: none;
  }
  .code__body {
    background: #696663;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    pointer-events: none;
    user-select: none;
    justify-content: space-between;
  }
  .digits-list {
    display: flex;
    align-items: center;
    font-family: 'chuterolk';
    font-size: 50px;
    color: #fff;
    margin-top: 6px;
  }
  .digits-list p {
    letter-spacing: 5px;
  }
  .copy__icon.checked {
    width: 30px;
  }
</style>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import SwitchBtn from './components/SwitchBtn.vue';
import MainSection from './layouts/MainSection.vue';
const themeStore = useThemeStore()
</script>

<template>
  <MainSection>
    <header>
      <div class="flex justify-end p-4">
        <SwitchBtn @click="themeStore.toggleTheme()">
          <span v-if="themeStore.theme === 'dark'" class="flex items-center justify-center w-full h-full text-sm">
            🌙
          </span>
          <span v-else class="flex items-center justify-center w-full h-full text-sm">
            ☀️
          </span>
        </SwitchBtn>
      </div>
    </header>
    <RouterView />
  </MainSection>
</template>

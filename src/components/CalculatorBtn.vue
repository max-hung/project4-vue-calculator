<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  icon: string | number
  type: 'number' | 'operator' | 'function' | 'empty'
}>()
const btnClass = computed(() => {
  if (props.type === 'function') return 'bg-gray-400 text-black'
  if (props.type === 'operator') return 'bg-orange-500 text-white'
  if (props.type === 'number') return 'bg-gray-800 text-white'
  return 'invisible'
})
</script>

<template>
  <button
    class="rounded-full text-base sm:text-xl lg:text-3xl p-3 sm:p-4 lg:p-5 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex justify-center items-center transition-all duration-150"
    :class="btnClass">
    <slot />
  </button>
</template>

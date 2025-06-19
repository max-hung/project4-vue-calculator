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
  <button class="rounded-full text-xl lg:text-3xl p-5 lg:w-20 lg:h-20 w-11 h-11 flex justify-center items-center"
    :class="btnClass">
    <slot />
  </button>
</template>

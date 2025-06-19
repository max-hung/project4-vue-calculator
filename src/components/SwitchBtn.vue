<template>
  <button :class="[
    'w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 dark:bg-gray-700 bg-gray-300',
  ]">
    <span :class="[
      'w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 dark:translate-x-6 translate-x-0',
    ]">
      <slot />
    </span>
  </button>
</template>

<template>
  <main class="transition-all bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col">
    <!-- Header -->
    <header v-if="$slots.header" class="max-h-14 shadow-md px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <slot name="header" />
    </header>

    <!-- Main -->
    <div class="flex-1 min-h-screen w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </div>

    <!-- Footer -->
    <footer v-if="$slots.footer"
      class="mt-auto bg-gray-100 dark:bg-gray-800 text-sm text-center text-gray-600 dark:text-gray-300 py-4">
      <slot name="footer" />
    </footer>
  </main>
</template>

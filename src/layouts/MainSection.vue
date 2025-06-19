<template>
  <main class="transition-all bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
    <!-- Header Section -->
    <header v-if="$slots.header" class="shadow-md">
      <slot name="header"></slot>
    </header>

    <!-- Main Content Section -->
    <div class="flex-1 container mx-auto p-4">
      <slot></slot>
    </div>

    <!-- Footer Section -->
    <footer v-if="$slots.footer" class="mt-auto bg-gray-100 dark:bg-gray-800 py-4">
      <slot name="footer"></slot>
    </footer>
  </main>
</template>

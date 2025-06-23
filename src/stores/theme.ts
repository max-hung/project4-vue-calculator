import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * 主題模式 Pinia Store
 */
export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark'>(getInitialTheme())

  /**
   * 取得初始主題模式
   * @returns {'light' | 'dark'} 初始主題模式
   */
  function getInitialTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved

    // 如果 localstorage 為空, 使用系統預設的主題
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  /**
   * 切換主題模式
   */
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  /**
   * 監聽主題變化，並將主題儲存到 localStorage
   * 同時更新 <html> class
   */
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    updateHtmlClass(newTheme)
  }, { immediate: true })

  /**
   * 更新 <html> class
   * @param {string} mode - 當前主題模式
   */
  function updateHtmlClass(mode: 'light' | 'dark') {
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    html.classList.add(mode)
  }

  return { theme, toggleTheme }
})

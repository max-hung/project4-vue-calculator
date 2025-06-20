<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import CalculatorBtn from '@/components/CalculatorBtn.vue'
import { useCalculator } from '@/composables/useCalculator'
import { calculatorButtons } from '@/constants/calculatorButtons'

const {
  formatWithCommas,
  handleClick,
  handleBackspace,
  displayExpression
} = useCalculator()

const resultDisplay = ref<HTMLElement | null>(null)

/**
 * 計算結果加上 GSAP 效果
 */
function animateResult() {
  if (!resultDisplay.value) return
  gsap.fromTo(
    resultDisplay.value,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
  )
}

/**
 * 監聽顯示表達式有變化則觸發特效
 */
watch(displayExpression, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== '') animateResult()
})

/**
 * 計算機鍵盤對應的按鍵
 */
const keyToSymbolMap: Record<string, string> = {
  '*': '×',
  '/': '÷',
  '+': '+',
  '-': '-',
  '%': '%',
  '=': '=',
  Enter: '=',
  Escape: 'AC',
  '.': '.',
}

/**
 * 處理按鍵對應事件
 */
function handleKeydown(e: KeyboardEvent) {
  (document.activeElement as HTMLElement)?.blur()
  const key = e.key

  if (/^\d$/.test(key)) {
    handleClick(key)
    return
  }

  if (keyToSymbolMap[key]) {
    handleClick(keyToSymbolMap[key])
    return
  }

  if (key === 'Backspace') {
    handleBackspace()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="grid gap-y-4 border border-gray-400 rounded-4xl p-4 sm:p-6 md:p-4 w-full max-w-[400px]">
      <!-- 顯示結果 -->
      <div ref="resultDisplay"
        class="text-right text-3xl sm:text-4xl md:text-5xl max-h-[100px] overflow-y-auto py-4 break-words">
        {{ formatWithCommas(displayExpression) || '0' }}
      </div>

      <!-- 按鈕區域 -->
      <div class="grid grid-cols-4 gap-2 sm:gap-4 justify-items-center">
        <CalculatorBtn v-for="btn in calculatorButtons" :key="btn.label" :icon="btn.label" :type="btn.type"
          @click="handleClick(btn.label)">
          {{ btn.label }}
        </CalculatorBtn>
      </div>
    </div>
  </div>
</template>

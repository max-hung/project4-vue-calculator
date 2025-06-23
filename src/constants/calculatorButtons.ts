type ButtonType = 'number' | 'operator' | 'function' | 'empty'

type CalculatorButton = {
  label: string | number
  type: ButtonType
}

/**
 * 順序按照計算機的按鈕排序與對應的type
 */
export const calculatorButtons: CalculatorButton[] = [
  { label: 'AC', type: 'function' },
  { label: '+/-', type: 'function' },
  { label: '%', type: 'function' },
  { label: '÷', type: 'operator' },
  { label: 7, type: 'number' },
  { label: 8, type: 'number' },
  { label: 9, type: 'number' },
  { label: '×', type: 'operator' },
  { label: 4, type: 'number' },
  { label: 5, type: 'number' },
  { label: 6, type: 'number' },
  { label: '-', type: 'operator' },
  { label: 1, type: 'number' },
  { label: 2, type: 'number' },
  { label: 3, type: 'number' },
  { label: '+', type: 'operator' },
  { label: '', type: 'empty' },
  { label: 0, type: 'number' },
  { label: '.', type: 'number' },
  { label: '=', type: 'operator' },
]

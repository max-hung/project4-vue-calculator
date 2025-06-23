import { describe, it, expect, beforeEach } from 'vitest'
import { useCalculator } from '@/composables/useCalculator'

describe('useCalculator', () => {
  let calculator: ReturnType<typeof useCalculator>;

  beforeEach(() => {
    calculator = useCalculator()
  });

  it('初始為 0', () => {
    expect(calculator.currentInput.value).toBe('0')
    expect(calculator.expression.value).toBe('')
    expect(calculator.displayExpression.value).toBe('')
  });

  it('輸入數字', () => {
    calculator.handleClick('1');
    calculator.handleClick('2');
    expect(calculator.currentInput.value).toBe('12');
    expect(calculator.expression.value).toBe('12');
  });

  it('加法運算', () => {
    calculator.handleClick('3');
    calculator.handleClick('+');
    calculator.handleClick('2');
    calculator.handleClick('=');
    expect(calculator.currentInput.value).toBe('5');
  });

  it('處理連續運算（例如 2 + 3 = =）', () => {
    calculator.handleClick('2');
    calculator.handleClick('+');
    calculator.handleClick('3');
    calculator.handleClick('=');
    expect(calculator.currentInput.value).toBe('5');

    calculator.handleClick('=');
    expect(calculator.currentInput.value).toBe('8');

    calculator.handleClick('=');
    expect(calculator.currentInput.value).toBe('11');
  });

  it('負號切換', () => {
    calculator.handleClick('5');
    calculator.handleClick('+/-');
    expect(calculator.currentInput.value).toBe('(-5)'); // 原邏輯預期值
  });

  it('小數點顯示', () => {
    calculator.handleClick('3');
    calculator.handleClick('.');
    calculator.handleClick('1');
    calculator.handleClick('4');
    expect(calculator.currentInput.value).toBe('3.14');
  });

  it('處理百分比', () => {
    calculator.handleClick('5');
    calculator.handleClick('0');
    calculator.handleClick('%');
    expect(calculator.currentInput.value).toBe('50%');
    calculator.handleClick('=');
    expect(calculator.currentInput.value).toBe('0.5');
  });

  it('刪除最後一個字元', () => {
    calculator.handleClick('1');
    calculator.handleClick('2');
    calculator.handleBackspace();
    expect(calculator.currentInput.value).toBe('1');
  });

  it('重設計算機', () => {
    calculator.handleClick('1');
    calculator.handleClick('+');
    calculator.handleClick('2');
    calculator.handleClick('AC');
    expect(calculator.currentInput.value).toBe('0');
    expect(calculator.expression.value).toBe('');
  });

  it.skip('無效運算式時應顯示 Error', () => {
    calculator.handleClick('+');
    calculator.handleClick('=');
    expect(calculator.currentInput.value).toBe('Error');
  });
});

import { ref } from 'vue';
import { evaluate } from 'mathjs';
import { formatWithCommas, convertOperator, replacePercentages, toggleNumberSign } from '@/utils/mathUtils';

export function useCalculator() {
  const currentInput = ref('0');          // 當前顯示的輸入或結果
  const expression = ref('');             // 實際的運算式（evaluate 用）
  const displayExpression = ref('');      // 顯示用的運算式（包含符號）
  const lastOperator = ref('');           // 上一次的運算符號
  const lastOperand = ref('');            // 上一次的操作數
  const lastResult = ref('');             // 上一次的結果
  const isResult = ref(false);            // 是否剛完成一次運算
  const operators = ['+', '-', '×', '÷']; // 支援的運算符號

  /**
   * 重設所有欄位
   */
  function resetCalculator() {
    currentInput.value = '0';
    expression.value = '';
    displayExpression.value = '';
    lastOperator.value = '';
    lastOperand.value = '';
    lastResult.value = '';
    isResult.value = false;
  }

  /**
   * 計算結果
   */
  function calculateResult() {
    // 替換乘除符號為 JS 可辨識格式（如 2×3 → 2*3）
    let expr = expression.value.replace(/×/g, '*').replace(/÷/g, '/');

    // 移除數字前面的多餘零（如 '003' → '3'；'-00042' → '-42'）
    expr = expr.replace(/\b(-?)0+(\d)/g, '$1$2');

    // 處理單一百分比數值（如：'50%' → '0.5'）
    if (!expr && currentInput.value.endsWith('%')) {
      const num = parseFloat(currentInput.value.replace('%', ''));
      if (!isNaN(num)) {
        const percentValue = num / 100;
        currentInput.value = percentValue.toString();
        displayExpression.value = currentInput.value;
        expression.value = '';
        isResult.value = true;
      }
      return;
    }

    //  若是連續按等號，使用最後一次的結果與操作進行計算
    if (!expr && lastResult.value && lastOperator.value && lastOperand.value) {
      expr = `${lastResult.value}${convertOperator(lastOperator.value)}${lastOperand.value}`;
    }

    if (!expr) return;

    // 若結尾是運算符，補上 lastOperand，例如：'3+' → '3+5'
    // 正則說明：/[+\-*/]$/ 匹配結尾為 + - * /
    if (/[+\-*/]$/.test(expr)) {
      if (lastOperand.value) expr += lastOperand.value;
      else return;
    }

    try {
      expr = replacePercentages(expr); //  處理運算式中帶 '%' 的部分

      // 儲存最後的運算式與操作數（支援連續按 =）
      // 範例：'2+5%' → ['+','5%']；'2×(-3)' → ['×','(-3)']
      const raw = expression.value;
      const match = raw.match(/([+\-×÷])(\(?-?\d+\.?\d*%?\)?)/);
      // ([+\-×÷])          → 匹配運算符
      // (\(?-?\d+\.?\d*%?\)?) → 匹配可能有括號的數字，可含負號、小數、百分比
      if (match) {
        lastOperator.value = match[1];
        lastOperand.value = match[2];
      }

      // 若運算式不完整（例如 '1+', '5.') 則視為錯誤
      // 如果結尾是小數點，補上 0（例如：'6.' → '6.0'）
      if (/[+\-*/.]$/.test(expr)) {
        if (expr.endsWith('.')) {
          expr += '0';
        } else {
          throw new Error('Invalid Expression');
        }
      }


      // 使用 mathjs 計算並四捨五入避免浮點誤差
      const result = evaluate(expr);
      const rounded = parseFloat(result.toFixed(10));

      // 將結果儲存並更新顯示
      expression.value = '';
      displayExpression.value = currentInput.value = rounded.toString();
      lastResult.value = rounded.toString();
      isResult.value = true;
    } catch {
      currentInput.value = 'Error';
      expression.value = '';
      displayExpression.value = '';
      isResult.value = false;
    }
  }

  /**
   * 處理小數點輸入
   */
  function handleDecimalPoint() {
    if (isResult.value) {
      currentInput.value = expression.value = displayExpression.value = '0.';
      isResult.value = false;
      return;
    }

    // 取得最後一段（例如：'1+2.3' → '2.3'）
    const parts = expression.value.split(/([+\-×÷])/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;

    const dot = lastPart === '' ? '0.' : '.';
    expression.value += dot;
    displayExpression.value += dot;
    currentInput.value = displayExpression.value;
  }

  /**
   * 切換正負號
   */
  function togglePositiveNegative() {
    if ((currentInput.value === '0' && !expression.value) || currentInput.value === '') return;

    if (isResult.value) {
      currentInput.value = toggleNumberSign(currentInput.value);
      expression.value = displayExpression.value = currentInput.value;
      isResult.value = false;
      return;
    }

    //  分析出最後的運算元（例如：'1+2' → '2'；'5×(-3)' → '(-3)'）
    const match = expression.value.match(/^(.*?)([+\-×÷])?(\(?-?\d+\.?\d*\)?)$/);
    if (!match) return;

    const [_, before, operator = '', number] = match;
    const toggled = toggleNumberSign(number);
    expression.value = displayExpression.value = before + operator + toggled;
    currentInput.value = toggled;
  }

  /**
   * 百分比轉換
   */
  function applyPercentage() {
    // 匹配最後的數字（不含符號）'100+20' → '20' → '20%' → 100+20%
    const match = expression.value.match(/(\d+\.?\d*)$/);

    if (!match) {
      const num = parseFloat(currentInput.value);
      if (!isNaN(num)) {
        const pct = `${num}%`;
        currentInput.value = displayExpression.value = expression.value = pct;
      }
      return;
    }

    const number = match[1];
    const before = expression.value.slice(0, -number.length);
    const pct = before + number + '%';
    currentInput.value = displayExpression.value = expression.value = pct;
  }

  /**
   * 處理按鈕點擊（數字、運算符、特殊鍵）
   */
  function handleClick(icon: string | number) {
    const iconStr = icon.toString();

    if (iconStr === 'AC') return resetCalculator();
    if (iconStr === '=') return calculateResult();
    if (iconStr === '+/-') return togglePositiveNegative();
    if (iconStr === '%') return applyPercentage();
    if (iconStr === '.') return handleDecimalPoint();

    // 處理運算子
    if (operators.includes(iconStr)) {
      if (isResult.value && lastResult.value) {
        expression.value = displayExpression.value = iconStr === '-' ? lastResult.value + iconStr : lastResult.value + iconStr;
        currentInput.value = displayExpression.value;
        isResult.value = false;
        return;
      }

      if (!expression.value) {
        expression.value = displayExpression.value = '0';
      }

      // 替換最後的運算子（若已存在）
      const lastChar = expression.value.slice(-1);
      if (operators.includes(lastChar)) {
        expression.value = expression.value.slice(0, -1) + iconStr;
        displayExpression.value = displayExpression.value.slice(0, -1) + iconStr;
      } else {
        expression.value += iconStr;
        displayExpression.value += iconStr;
      }

      currentInput.value = displayExpression.value;
      isResult.value = false;
      return;
    }

    // 處理數字輸入
    if (!isNaN(Number(iconStr))) {
      if (isResult.value) {
        expression.value = displayExpression.value = currentInput.value = iconStr;
        isResult.value = false;
        return;
      }

      const parts = expression.value.split(/([+\-×÷])/);
      const lastPart = parts[parts.length - 1];
      const prevOp = parts[parts.length - 2] ?? '';

      // 防止 '03' 這種開頭 0 的格式（轉成 '3'）
      if (lastPart === '0' && (parts.length === 1 || operators.includes(prevOp))) {
        parts[parts.length - 1] = iconStr;
      } else if (lastPart === '-0') {
        parts[parts.length - 1] = '-' + iconStr;
      } else {
        expression.value += iconStr;
        displayExpression.value += iconStr;
        currentInput.value = displayExpression.value;
        return;
      }

      expression.value = parts.join('');
      displayExpression.value = expression.value;
      currentInput.value = displayExpression.value;
    }
  }

  /**
   * 刪除最後一個字元
   */
  function handleBackspace() {
    expression.value = expression.value.slice(0, -1);
    displayExpression.value = displayExpression.value.slice(0, -1);
    currentInput.value = displayExpression.value || '0';
  }

  return {
    currentInput,
    expression,
    displayExpression,
    formatWithCommas,
    handleClick,
    handleBackspace,
  };
}

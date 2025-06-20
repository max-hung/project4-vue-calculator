// utils/mathUtils.ts

/**
 * 轉換運算符為 JS 可解析格式
 * @param op - 使用者輸入運算符
 * @returns JS 可解析的運算符
 * @example
 * convertOperator('×'); // 返回 '*'
 * convertOperator('÷'); // 返回 '/'
 * convertOperator('+'); // 返回 '+'
 */
export function convertOperator(op: string): string {
  if (op === '×') return '*';
  if (op === '÷') return '/';
  return op;
}

/**
 * 格式化千分位
 * @param value - 數字字串
 * @returns 格式化後的字串，包含千分位逗號
 * @example
 * formatWithCommas('1234567.89'); // 返回 '1,234,567.89'
 * formatWithCommas('1000'); // 返回 '1,000'
 */
export function formatWithCommas(value: string): string {
  if (!value || isNaN(Number(value))) return value;
  const [intPart, decimalPart] = value.split('.');
  const formattedInt = Number(intPart).toLocaleString();
  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
}

/**
 * 替換表達式中的百分比運算（轉換成乘以 0.01）
 * 若在加減運算中會依前值計算百分比
 * @param expr - 表達式字串
 * @returns 處理後的表達式
 * @example
 * replacePercentages('100 + 10%'); // 返回 '100 + 10'
 * replacePercentages('50%'); // 返回 '(50 / 100)'
 */
export function replacePercentages(expr: string): string {
  return expr.replace(/(\d+(\.\d+)?)%/g, (match, percentStr, _, offset) => {
    const percent = parseFloat(percentStr);
    const before = expr.slice(0, offset);

    const operatorMatch = before.match(/(\d+(\.\d+)?)(\s*)([+\-])(\s*)$/);
    if (operatorMatch) {
      const base = parseFloat(operatorMatch[1]);
      const value = (base * percent) / 100;
      return value.toString();
    }
    return `(${percent} / 100)`;
  });
}

/**
 * 切換數字正負號
 * 若為正則轉為負，若為負則還原為正
 * @param numStr - 數字字串
 * @returns 返回負數(包含掛號)或正數
 * @example
 * toggleNumberSign('123'); // 返回 '(-123)'
 * toggleNumberSign('(-123)'); // 返回 '123'
 * toggleNumberSign('-123'); // 返回 '123'
 */
export function toggleNumberSign(numStr: string): string {
  if (numStr.startsWith('(-') && numStr.endsWith(')')) return numStr.slice(2, -1);
  if (numStr.startsWith('(') && numStr.endsWith(')')) return numStr.slice(1, -1);
  if (numStr.startsWith('-')) return numStr.slice(1);
  return `(-${numStr})`;
}

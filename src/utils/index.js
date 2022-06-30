import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * 可以用作 filter
 * yyyy 常用格式化年格式
 * @param {*} value 时间点
 * @param {*} formatter 格式化模板
 */
const dateFormat = (value, formatter) => {
  if (!value) return '';
  const date = dayjs(value);
  // 格式化时间
  let formatterString = 'yyyy-MM-DD';
  if (typeof formatter === 'string') {
    formatterString = formatter;
  } else if (typeof formatter === 'boolean' && formatter) {
    formatterString = 'yyyy-MM-DD HH:mm:ss';
  }

  formatterString = formatterString.replace(/yyyy/gi, 'YYYY');

  return date.format(formatterString);
};

export default {
  dateFormat,
};

/**
 * @example findLabelByValue(1, [{label: 'A', value: 0},{label: 'B', value: 1}], ['label', 'value'])
 * @param value
 */
export const findLabelByValue = (value, options, kvMap = ['label', 'value'] /* [label key, value key] */) =>
  options.find((option) => option[kvMap[1]] === value)?.[kvMap[0]];

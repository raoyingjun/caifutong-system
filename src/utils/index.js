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
 * @example findLabelByValue(1, [{label: 'A', value: 0},{label: 'B', value: 1}], ['label', 'value']) => 'A'
 * @param {Number | String} value 要查找的 value
 * @param {Object} options 选项列表。形如 [{label: 'A', value: 0},{label: 'B', value: 1}]
 * @param {[String, String]} kvMap 对应选项列表的 label 和 value 字段名。形如：['label', 'value']
 * @return 查找到的 value 对应 value
 */
export const findLabelByValue = (value, options, kvMap = ['label', 'value'] /* [label key, value key] */) =>
  options.find((option) => option[kvMap[1]] === value)?.[kvMap[0]];

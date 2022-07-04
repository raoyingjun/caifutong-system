import { isNil } from 'lodash';
export const formatIndex = (idx) => (idx < 9 ? `0${idx + 1}` : idx + 1);
export const substringFileName = (fileName) => (isNil(fileName) ? '' : fileName.slice(fileName.lastIndexOf('/') + 1));

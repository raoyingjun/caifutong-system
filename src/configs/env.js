export const getMode = () => import.meta.env.MODE;
export const isDev = () => import.meta.env.DEV;
export const isProd = () => import.meta.env.PROD;
export const getApiHost = (devApiPrefixPath = '/api') => (isDev() ? devApiPrefixPath : import.meta.env.VITE_API_HOST);
export const getApiVersion = () => import.meta.env.VITE_API_VERSION;
export const getApiBaseUrl = (devApiPrefixPath = '/api') => `${getApiHost(devApiPrefixPath)}/${getApiVersion()}`;
const UPLOAD_FILE_URL = 'upload-files';
export const getFileUploadUrl = (devApiPrefixPath) => `${getApiBaseUrl(devApiPrefixPath)}/${UPLOAD_FILE_URL}`;

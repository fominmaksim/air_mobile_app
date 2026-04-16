const DEFAULT_API_BASE_URL = '127.0.0.1:3000';

type NativeConfigShape = {
  API_BASE_URL?: string;
};

const readNativeConfig = (): NativeConfigShape | null => {
  try {
    const mod = require('react-native-config');
    return (mod?.default ?? mod) as NativeConfigShape;
  } catch (error) {
    console.warn(
      'react-native-config is unavailable, using fallback env values.',
      error,
    );
    return null;
  }
};

const nativeConfig = readNativeConfig();

export const API_BASE_URL_HOST =
  nativeConfig?.API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

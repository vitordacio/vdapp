import { MMKV } from 'react-native-mmkv';
import { IStorage } from '.';

const storage = new MMKV();

export const mmkvStorage: IStorage = {
  getItem: async key => {
    const item = storage.getString(key);

    return item ? JSON.parse(item) : null;
  },
  setItem: async (key, value) => {
    storage.set(key, JSON.stringify(value));
  },
  removeItem: async key => {
    storage.delete(key);
  },
};

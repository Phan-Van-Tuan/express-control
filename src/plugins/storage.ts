// import Cookies from "js-cookie";
export enum KEYSTORE {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

const storage = {
  set(key: KEYSTORE, value: string, option?: {}) {
    localStorage.setItem(key, value);
  },
  get(key: KEYSTORE) {
    return localStorage.getItem(key);
  },
  remove(key: KEYSTORE) {
    localStorage.removeItem(key);
  },
};

export default storage;

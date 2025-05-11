type KEYSTORE = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export const storage = {
  set(key: KEYSTORE, value: string, option?: {}) {
    localStorage.setItem(key, value);
  },
  get(key: KEYSTORE): string {
    return localStorage.getItem(key) || "";
  },
  remove(key: KEYSTORE) {
    localStorage.removeItem(key);
  },
};

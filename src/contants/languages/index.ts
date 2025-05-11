import en from "./en";
// import vi from "./vi" (sau này thêm)

export const languages = {
  en,
  // vi,
};

export type LangKey = keyof typeof languages;

export const defaultLang: LangKey = "en";

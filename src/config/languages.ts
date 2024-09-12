export const languages: LanguageType[] = [
  { code: "en", name: "English", flag: "/flags/europe-flag-icon.svg" },
  { code: "sk", name: "Slovak", flag: "/flags/slovakia-flag-icon.svg" },
];

export type LanguageType = {
  code: "en" | "sk";
  name: string;
  flag: string;
};

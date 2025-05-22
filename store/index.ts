// store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICountry } from "react-native-international-phone-number";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserDetails = {
  contact_number: string;
  country_code: ICountry;
  email: string;
  full_name: string;
  gender: string;
  home_address: string;
  is_admin: boolean;
  is_email_verified: boolean;
  is_new_user: boolean;
  is_phone_verified: boolean;
  profile_pic: string;
  qrCode: string;
  uid: string;
};

type UserStore = {
  userDetails: UserDetails;
  updateZustandUserDetailsField: (
    fieldName: keyof UserDetails,
    value: string
  ) => void;
  updateZustandUserDetails: (value: UserDetails) => void;
  createNewZustandUser: (userDetails: any) => void;
};

type ThemeStore = {
  theme: "Light" | "Dark";
  updateTheme: (isDarkTheme: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: {
        country_code: {
          callingCode: "+91",
          cca2: "IN",
          flag: "🇮🇳",
          name: {
            bg: "Индия",
            by: "Індыя",
            cn: "印度",
            cz: "Indie",
            de: "Indien",
            ee: "India",
            el: "Ινδία",
            en: "India",
            ar: "الهند",
            es: "India",
            fr: "Inde",
            he: "הוֹדוּ",
            it: "India",
            jp: "インド",
            nl: "India",
            pl: "Indie",
            pt: "Índia",
            ro: "India",
            ru: "Индия",
            ua: "Індія",
            zh: "印度",
            tr: "Hindistan",
          },
          phoneMasks: ["#### ### ###"],
        },
        contact_number: "",
        is_admin: false,
        is_email_verified: false,
        is_new_user: false,
        is_phone_verified: false,
        email: "",
        full_name: "",
        gender: "",
        home_address: "",
        profile_pic: "",
        qrCode: "",
        uid: "",
      },
      updateZustandUserDetailsField: (fieldName, value) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            [fieldName]: value,
          },
        })),
      updateZustandUserDetails: (value: any) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            ...value,
          },
        })),
      createNewZustandUser: (userDetails: any) =>
        set((state) => ({
          userDetails,
        })),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "Light",
      updateTheme: (isDarkTheme: boolean) =>
        set({ theme: !isDarkTheme ? "Dark" : "Light" }),
    }),
    {
      name: "app-theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

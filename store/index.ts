// store.ts
import { defaultCountry, defaultUserDetails } from "@/constants/default-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICountryName } from "react-native-international-phone-number/lib/interfaces/countryName";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// @ts-ignore
import { countries } from "react-native-international-phone-number/lib/constants/countries";

type CountryType = {
  callingCode: string;
  cca2: string;
  flag: string;
  name: ICountryName;
  phoneMasks?: string[];
};

export type UserDetails = {
  address_type: string;
  city: string;
  country: CountryType;
  email: string;
  full_name: string;
  house_no: string;
  id: string;
  is_active: boolean;
  is_admin: boolean;
  is_email_verified: boolean;
  is_phone_number_verified: boolean;
  phone_number: string;
  profile_pic: string;
  role: string;
  shop_name: string;
  street_name: string;
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

const getFormattedUserDetails = (userData: any) => {
  const country = countries?.find(
    (countryItem: any) => countryItem?.callingCode === userData?.calling_code
  );
  const newUserDetails = {
    id: userData?.id,
    full_name: userData?.full_name,
    email: userData?.email,
    profile_pic: userData?.profile_pic,
    phone_number: userData?.phone_number,
    house_no: userData?.house_no,
    street_name: userData?.street_name,
    city: userData?.city,
    country: country || defaultCountry,
    address_type: userData?.address_type,
    shop_name: userData?.address_type,
    is_phone_number_verified: userData?.is_phone_number_verified,
    is_email_verified: userData?.is_email_verified,
    is_admin: userData?.is_admin,
    role: userData?.role,
    is_active: userData?.is_active,
  };
  return newUserDetails;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: defaultUserDetails,
      updateZustandUserDetailsField: (fieldName, value) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            [fieldName]: value,
          },
        })),
      updateZustandUserDetails: (userData: any) => {
        const newUserDetails = getFormattedUserDetails(userData);
        return set(() => ({
          userDetails: newUserDetails,
        }));
      },

      createNewZustandUser: (userDetails: any) => {
        const newUserDetails = getFormattedUserDetails(userDetails);
        return set(() => ({
          userDetails: newUserDetails,
        }));
      },
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

// store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserDetails = {
  contact_number: string;
  email: string;
  full_name: string;
  gender: string;
  home_address: string;
  profile_pic: string;
};

type UserStore = {
  userDetails: UserDetails;
  updateUserDetails: (fieldName: keyof UserDetails, value: string) => void;
};

type ThemeStore = {
  theme: "Light" | "Dark";
  updateTheme: (isDarkTheme: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: {
        contact_number: "9677316806",
        email: "shyamganeshravichandran@gmail.com",
        full_name: "shyam ganesh",
        gender: "Male",
        home_address: "20A, Thirunagar, srinivasapuram, thanjavur",
        profile_pic:
          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
      updateUserDetails: (fieldName, value) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            [fieldName]: value,
          },
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

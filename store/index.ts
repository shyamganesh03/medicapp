import { create } from "zustand";

const useUserStore = create((set) => ({
  userDetails: {
    contact_number: "9677316806",
    email: "shyamganeshravichandran@gmail.com",
    full_name: "shyam ganesh",
    gender: "Male",
    home_address: "20A, Thirunagar, srinivasapuram, thanjavur",
    profile_pic:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  updateUserDetails: (fieldName: string, value: string) =>
    set((state: any) => ({ ...state, [fieldName]: value })),
}));

export { useUserStore };

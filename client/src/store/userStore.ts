import { create } from "zustand";

interface User {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  data: any;
  setData: (data: any) => void;
}

export const userStore = create<User>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
  setData: (data: any) => set({ data }),
  data: {},
}));



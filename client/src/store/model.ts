import { create } from "zustand";

interface NewInvoiceModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const openNewInvoiceModal = create<NewInvoiceModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

interface UserProfile {
  username: string;
  email: string;
  profilePicture: string;
}

interface UserProfileStore {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  openUserProfileModal: boolean;
  setOpenUserProfileModal: (openUserProfileModal: boolean) => void;
}

export const userProfileStore = create<UserProfileStore>((set) => ({
  user: {
    username: "",
    email: "",
    profilePicture: "",
  },
  setUser: (user: UserProfile) => set({ user }),
  openUserProfileModal: false,
  setOpenUserProfileModal: (openUserProfileModal: boolean) =>
    set({ openUserProfileModal }),
}));

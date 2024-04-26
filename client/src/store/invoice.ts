import { create } from "zustand";
import { getInvoices, getInvoiceById } from "../apicalls/invoice";
import { getUserBySessionToken, getUserInfo } from "../apicalls/users";
import { TInvoice } from "../types/invoice";

interface SessionTokenState {
  token: string | null;
  sessionToken: any | null;
  setSessionToken: (token: string, sessionToken: any) => void;
}

interface User {
  username: string;
  email: string;
  profilePicture: string;
  companyAddress?: string;
  companyLogo?: string;
  companyName?: string;
}

// user info
interface UserInfoState {
  user: User;
  fetchUserInfo: () => Promise<void>;
}

export const useUserInfo = create<UserInfoState>((set) => ({
  user: {
    username: "",
    email: "",
    profilePicture: "",
  },
  fetchUserInfo: async () => {
    const sessionToken = localStorage.getItem("token");
    if (!sessionToken) return;
    const response = await getUserInfo({ token: sessionToken });
    set({ user: response.data });
  },
}));

export const useSessionToken = create<SessionTokenState>((set) => ({
  token: localStorage.getItem("token"),
  sessionToken: null,
  setSessionToken: (token, sessionToken) => set({ token, sessionToken }),
}));

interface DataState {
  data: TInvoice;
  fetchData: () => Promise<void>;
}

interface AddInvoiceModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const openAddInvoiceModal = create<AddInvoiceModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

interface EditInvoiceModalState {
  openEditInvoice: boolean;
  setOpenEditInvoice: (openEditInvoic: boolean) => void;
}

interface ViewInvoiceModalState {
  openViewInvoice: boolean;
  setOpenViewInvoice: (openViewInvoice: boolean) => void;
}

export const openViewInvoiceModal = create<ViewInvoiceModalState>((set) => ({
  openViewInvoice: false,
  setOpenViewInvoice: (openViewInvoice: boolean) => set({ openViewInvoice }),
}));

export const openEditInvoiceModal = create<EditInvoiceModalState>((set) => ({
  openEditInvoice: false,
  setOpenEditInvoice: (openEditInvoice: boolean) => set({ openEditInvoice }),
}));

interface InvoiceIdState {
  id: string;
  setId: (id: string) => void;
}

export const invoiceId = create<InvoiceIdState>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
}));

interface DataState {
  data: TInvoice;
  fetchData: () => Promise<void>;
}
interface DataState2 {
  data: TInvoice;
  setData: (data: any) => void;
  fetchInvoice: (id: string) => Promise<void>;
}

export const useInvoices = create<DataState>((set) => ({
  data: {
    clientName: "",
    description: "",
    total: 0,
    status: "",
    invoiceDate: "",
    items: [],
  },
  fetchData: async () => {
    const { sessionToken } = useSessionToken.getState();
    if (!sessionToken) return;
    const response = await getInvoices({ userid: sessionToken._id });
    set({ data: response.data });
  },
}));

export const useInvoiceById = create<DataState2>((set) => ({
  data: {
    clientName: "",
    description: "",
    total: 0,
    status: "",
    invoiceDate: "",
    items: [],
  },
  setData: (data) => set({ data }),
  fetchInvoice: async (id: string) => {
    const { sessionToken } = useSessionToken.getState();
    if (!sessionToken) return;
    const response = await getInvoiceById({
      _id: id,
      userid: sessionToken._id,
    });
    set({ data: response.data });
  },
}));

const initializeStore = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await getUserBySessionToken({ token });
    if (response.success) {
      useSessionToken.setState({ sessionToken: response.data });
      useInvoices.getState().fetchData();
      useInvoiceById.getState().fetchInvoice(invoiceId.getState().id);
      useUserInfo.getState().fetchUserInfo();
    } else {
      console.error("Error fetching session token:", response.error);
    }
  } catch (error) {
    console.error("Error fetching session token:", error);
  }
};

initializeStore();

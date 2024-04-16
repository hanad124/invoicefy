export type TItem = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};
export type TInvoice = {
  _id?: string;
  clientName: string;
  description: string;
  total: number;
  status: string;
  invoiceDate: string;
  items: TItem[];
};

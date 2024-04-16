import { axiosInstance } from ".";

export const getInvoices = async ({ userid: string }: { userid: string }) => {
  try {
    const response = await axiosInstance.post("/invoices", { userid: string });

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const getInvoiceById = async ({
  _id,
  userid,
}: {
  _id: string;
  userid: string;
}) => {
  try {
    const response = await axiosInstance.post(`/invoices/${_id}`, {
      _id,
      userid,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const createInvoice = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/createInvoice", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const updateInvoice = async (payload: any) => {
  const { _id, user, clientName, total, status, description, items } = payload;
  console.log("payload:", payload);
  try {
    const response = await axiosInstance.put(`/invoices/${_id}`, {
      _id,
      userid: user,
      clientName,
      total,
      status,
      description,
      items,
    });

    console.log("res:", response.data);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const updateInvoiceStatus = async ({
  _id,
  userid,
  status,
}: {
  _id: string;
  userid: string;
  status: string;
}) => {
  try {
    const response = await axiosInstance.put(`/invoices/updateInvoiceStatus`, {
      _id,
      userid,
      status,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteInvoice = async ({
  _id,
  userid,
}: {
  _id: string;
  userid: string;
}) => {
  try {
    const response = await axiosInstance.delete(`/invoices/deleteInvoice`, {
      data: { _id, userid },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteItem = async ({
  _id,
  userid,
}: {
  _id: string;
  userid: string;
}) => {
  try {
    const response = await axiosInstance.delete(`/invoices/deleteItem`, {
      data: { _id, userid },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

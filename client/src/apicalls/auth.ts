import { axiosInstance } from ".";

export const registerUser = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/auth/register", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const loginUser = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

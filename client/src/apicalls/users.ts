import { axiosInstance } from ".";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const getUserInfo = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/get-user-info", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const getUserBySessionToken = async (payload: any) => {
  try {
    const response = await axiosInstance.post(
      "/get-user-by-session-token",
      payload
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const updateUserProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.put("/update-user-profile", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

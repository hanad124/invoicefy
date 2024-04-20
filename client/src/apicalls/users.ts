import { axiosInstance } from ".";

// get all users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

// get user by id
export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

// get user info
export const getUserInfo = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/get-user-info", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

// get user by session token
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

// update user profile
export const updateUserProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.put("/update-user-profile", payload);

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

// udpate user company info
export const updateUserCompanyInfo = async (payload: any) => {
  console.log(payload);
  try {
    const response = await axiosInstance.patch(
      "/update-user-company-info",
      payload
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

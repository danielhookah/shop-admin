import axios from 'utils/request';
import { ILogin } from "types/forms/auth";
import { LOGIN, REGISTER, REFRESH_TOKEN, LOGOUT } from "constants/paths";

export const login = async (data: ILogin) => {
  try {
    const response = await axios.post(LOGIN, data, {
      withCredentials: true
    });
    return { ...response.data, user: {} };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const register = async (data: ILogin) => {
  try {
    const response = await axios.post(REGISTER, data, {
      withCredentials: true
    });
    return { ...response.data, user: {} };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const logout = async () => {
  try {
    await axios.post(LOGOUT);
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(REFRESH_TOKEN, {}, {
      withCredentials: true
    });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.log(111, error)
    throw new Error('Token refresh failed');
  }
};

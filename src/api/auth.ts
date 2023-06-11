import axios from 'utils/request';
import { ILogin } from "types/forms/auth";
import { LOGIN, REFRESH_TOKEN } from "constants/paths";

export const loginAPI = async (data: ILogin) => {
  try {
    const response = await axios.post(LOGIN, data);
    // todo
    return { ...response.data, user: {} };
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(REFRESH_TOKEN);
    const { token } = response.data;
    return token;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

// todo register

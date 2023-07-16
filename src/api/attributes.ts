import axios from 'utils/request';
import { ATTRIBUTES, } from "constants/paths";

export const get = async () => {
  try {
    const response = await axios.get(ATTRIBUTES, {
      withCredentials: true
    });
    return [...response.data];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

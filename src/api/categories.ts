import axios from "utils/request";
import { CATEGORIES } from "constants/paths";

export const get = async () => {
  try {
    const response = await axios.get(CATEGORIES, {
      withCredentials: true,
    });
    return [...response.data];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

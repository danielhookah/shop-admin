import axios from 'utils/request';
import { PRODUCTS } from "constants/paths";

export const getByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${PRODUCTS}?userId=${userId}`, {
      withCredentials: true
    });
    return [...response.data];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const create = async (data: FormData) => {
  try {
    const response = await axios.post(PRODUCTS, data, {
      withCredentials: true
    });
    return { ...response.data };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const update = async (data: FormData) => {
  try {
    const response = await axios.put(PRODUCTS + '/' + data.get("id"), data, {
      withCredentials: true
    });
    return { ...response.data };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const deleteItem = async (id: string) => {
  try {
    const response = await axios.delete(PRODUCTS + '/' + id, {
      withCredentials: true
    });
    return { ...response.data };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

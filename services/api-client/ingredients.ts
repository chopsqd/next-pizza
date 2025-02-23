import { Ingredient } from '@prisma/client';
import { axiosInstance } from "./axios-instance";
import { ApiRoutes } from "@/services/api-client/constants";

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
import { BaseURL } from "consts";

export type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

export type TUser = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any;
};

export const getUser = async (params: { id: number }): Promise<TUser> => {
  try {
    const response = await fetch(`${BaseURL}/users/${params.id}`);
    return await response.json();
  } catch {
    throw new Error("service getUser error");
  }
};

"use server";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (userData: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), userData.email, userData.phone, undefined, userData.name);
    console.log(newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users?.list([Query.equal("email", [userData.email])]);
      console.log(error);
      return existingUser.users[0];
    }
    console.log("Error while create new user", error);
  }
};

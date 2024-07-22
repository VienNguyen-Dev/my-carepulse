"use server";

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
  try {
    const appointment = await databases.createDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, ID.unique(), appointmentData);
    return parseStringify(appointment);
  } catch (error) {
    console.log("Error while create new appointment", error);
  }
};

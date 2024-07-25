"use server";

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
  try {
    const appointment = await databases.createDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, ID.unique(), appointmentData);
    return parseStringify(appointment);
  } catch (error) {
    console.log("Error while create new appointment", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId);
    return parseStringify(appointment);
  } catch (error) {
    console.log("Error while get appointment", error);
  }
};

export const getRecentAppointment = async () => {
  try {
    const recentAppointment = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [Query.orderDesc("$createdAt")]);
    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (recentAppointment.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduledCount += 1;
      }
      if (appointment.status === "pending") {
        acc.pendingCount += 1;
      }
      if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCount);
    const data = {
      ...counts,
      totalCount: recentAppointment.total,
      documents: recentAppointment.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log("Error while get recent appointment", error);
  }
};

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId, appointment);
    if (!updateAppointment) {
      throw new Error("Appointment not found.");
    }

    //gui SMS notification cho user
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("Error while updating appointment", error);
  }
};

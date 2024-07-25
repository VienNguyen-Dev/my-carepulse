"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { getAppointmentSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { Doctors } from "@/app/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";

const AppointmentForm = ({
  userId,
  type,
  patientId,
  appointment,
  setOpen,
}: {
  userId: string;
  type: "create" | "schedule" | "cancel";
  patientId: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case "cancel":
        status = "cancelled";
        break;
      case "schedule":
        status = "scheduled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          schedule: new Date(values.schedule),
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);
        if (appointment) router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
      } else {
        const appointmentData = {
          appointmentId: appointment?.$id!,
          userId,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason,
            note: values.note,
            status: status as Status,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentData);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appoitment";
      break;
    default:
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">
        {type === "create" && (
          <section className=" space-y-4">
            <h1 className="header">New Appointment 👋</h1>
            <p className=" text-dark-700">Request a new appointment in 10 seconds</p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField control={form.control} name="primaryPhysician" label="Doctor" fieldType={FormFieldType.SELECT} placeholder="Select a physician">
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className=" flex items-center gap-2 cursor-pointer">
                    <Image src={doctor.image} alt={doctor.name} width={24} height={24} className=" rounded-full  border border-dark-500" />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              dateFormat="dd/MM/yyyy - h:mm aa"
              showTimeSelect
              name="schedule"
              label="Expected appointment date"
              fieldType={FormFieldType.DATEPICKER}
              placeholder="Select your appointment date"
            />

            <div className=" flex flex-col gap-6 xl:flex-row">
              <CustomFormField control={form.control} name="reason" label="Reason for appoinment" fieldType={FormFieldType.TEXTAREA} placeholder="Anmual monthy check-up" />
              <CustomFormField control={form.control} name="note" label="Notes" fieldType={FormFieldType.TEXTAREA} placeholder="Prefer afternoon appointment if possible" />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField control={form.control} name="cancellationReason" label="Reason for cancellation" fieldType={FormFieldType.TEXTAREA} placeholder="Enter reason for cancelation" />
        )}
        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;

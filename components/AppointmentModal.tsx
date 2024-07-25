"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";
import clsx from "clsx";
import { useState } from "react";
import AppointmentForm from "./form/AppointmentForm";
import { Button } from "./ui/button";

interface AppointmentModalProps {
  userId: string;
  patientId: string;
  type: "schedule" | "cancel";
  appointment: Appointment;
}

const AppointmentModal = ({ userId, patientId, type, appointment }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={`capitalize ${type === "schedule" && "text-green-500"}`}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className=" mb-4 space-y-3">
          <DialogTitle className="capitalize text-xl">{type} Appointment</DialogTitle>

          <DialogDescription className=" text-dark-600">Please fill in the following details to {type}</DialogDescription>
        </DialogHeader>
        <AppointmentForm type={type} userId={userId} patientId={patientId} appointment={appointment} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;

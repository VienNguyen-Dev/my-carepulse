"use client";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Doctors } from "@/app/constants";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => {
      return <h2 className="text-14-medium">{row.index + 1}</h2>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return <p className=" text-14-medium">{formatDateTime(row.original.schedule).dateTime}</p>;
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctors",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician);
      return (
        <div className=" flex items-center gap-3">
          <Image src={doctor?.image!} alt="doctor" width={100} height={100} className="size-8" />
          <p className="text-14-regular whitespace-nowrap">{doctor?.name}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className=" pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex items-center gap-4">
          <AppointmentModal userId={row.original.userId} type="schedule" patientId={row.original.patient.$id} appointment={row.original} />
          <AppointmentModal userId={row.original.userId} type="cancel" patientId={row.original.patient.$id} appointment={row.original} />
        </div>
      );
    },
  },
];

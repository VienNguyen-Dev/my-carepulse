import { Doctors } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/actions/patient.actions";

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_appointment-success", user.name);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  return (
    <div className=" min-h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={"/"}>
          <Image src={"/assets/icons/logo-full.svg"} alt="logo" width={1000} height={1000} className="max-w-[180px]" />
        </Link>
        <div className="flex flex-col items-center gap-4 ">
          <Image src={"/assets/gifs/success.gif"} alt="success" width={300} height={280} />
          <h2 className="mb-2 text-center header max-w-[600px]">
            Your <span className=" text-green-500">appointment request</span> has been successfully submitted!
          </h2>
          <p className=" text-dark-600">We'll be in touch shortly to confirm.</p>
        </div>
        <section className="request-details">
          <p className=" text-dark-600">Requested appointment details: </p>
          <div className=" flex items-center gap-2  border border-dark-500 px-2 py-2 bg-dark-400 rounded-md">
            <Image src={doctor?.image!} alt="doctor" width={24} height={24} className=" h-10 w-fit" />
            <p>Dr. {doctor?.name}</p>
          </div>
          <div className=" flex items-center gap-2 text-dark-600 ">
            <Image src={"/assets/icons/calendar.svg"} alt="calendar" width={24} height={24} />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button className=" shad-primary-btn" asChild variant={"outline"}>
          <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button>
        <p className="copyright">@2024 CarePulse</p>
      </div>
    </div>
  );
};

export default Success;

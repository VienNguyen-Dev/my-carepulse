import AppointmentForm from "@/components/form/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_new-appointment", patient.name);
  return (
    <div className=" h-screen max-h-screen flex ">
      <section className=" remove-scrollbar container">
        <div className=" sub-container max-w-[860px] flex flex-col py-10">
          <Image src={"/assets/icons/logo-full.svg"} alt="patient" width={1000} height={1000} className="h-10 mb-20 w-fit" />
          <AppointmentForm userId={userId} type="create" patientId={patient.$id} />
          <div className=" flex justify-between text-regular-14 mt-20">
            <p className=" justify-end md:text-left text-dark-600">@2024 CarePulse</p>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/appointment-img.png"} width={1000} height={1000} alt="patient" className="side-img max-w-[30%] bg-bottom" />
    </div>
  );
};

export default Appointment;

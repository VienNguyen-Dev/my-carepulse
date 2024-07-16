import PatientForm from "@/components/form/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen max-h-screen flex">
      <section className=" remove-scrollbar container my-auto">
        <div className=" sub-container max-w-[496px]">
          <Image src={"/assets/icons/logo-full.svg"} alt="patient" width={1000} height={1000} className="h-10 mb-20 w-fit" />
          <PatientForm />
          <div className=" flex justify-between text-regular-14 mt-20">
            <p className=" justify-end md:text-left text-dark-600">@2024 CarePulse</p>
            <Link href={"/?admin=true"} className=" text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/onboarding-img.png"} width={1000} height={1000} alt="patient" className="side-img max-w-[50%]" />
    </div>
  );
}

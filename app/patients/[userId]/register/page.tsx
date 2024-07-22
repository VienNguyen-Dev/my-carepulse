import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className=" h-screen max-h-screen flex ">
      <section className=" remove-scrollbar container">
        <div className=" sub-container max-w-[860px] flex flex-col py-10">
          <Image src={"/assets/icons/logo-full.svg"} alt="patient" width={1000} height={1000} className="h-10 mb-20 w-fit" />
          <RegisterForm user={user} />
          <div className=" flex justify-between text-regular-14 mt-20">
            <p className=" justify-end md:text-left text-dark-600">@2024 CarePulse</p>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/register-img.png"} width={1000} height={1000} alt="patient" className="side-img max-w-[30%]" />
    </div>
  );
};

export default Register;

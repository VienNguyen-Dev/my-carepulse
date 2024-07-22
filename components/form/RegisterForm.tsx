"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormLabel } from "../ui/form";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import { PatientFormValidation } from "@/lib/validation";

import { useState } from "react";
import { registerPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/app/constants";
import { formatToUpperCase } from "@/lib/utils";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      //@ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">
        <section className=" space-y-4">
          <h1 className="header">Wellcome 👋</h1>
          <p className=" text-dark-700">Let us konw more about yourself</p>
        </section>
        <section className=" space-y-4">
          <div className=" space-y-1">
            <h2 className=" sub-header">Personal Information</h2>
          </div>
          <CustomFormField control={form.control} name="name" fieldType={FormFieldType.INPUT} placeholder="Nguyen Chi Vien" label="Full name" iconSrc="/assets/icons/user.svg" iconAlt="user" />
          <div className=" flex flex-col xl:flex-row gap-6">
            <CustomFormField control={form.control} name="email" fieldType={FormFieldType.INPUT} placeholder="chivien107@gmail.com" label="Email" iconSrc="/assets/icons/email.svg" iconAlt="email" />
            <CustomFormField control={form.control} name="phone" fieldType={FormFieldType.PHONE_INPUT} placeholder="(+84) 382195720" label="Phone number" iconAlt="phone" />
          </div>
          <div className=" flex flex-col xl:flex-row gap-6">
            <CustomFormField control={form.control} name="birthDate" label="Date of Birth" fieldType={FormFieldType.DATEPICKER} placeholder="Select your birth date" />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SKELETON}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} className="flex gap-4 h-11 xl:justify-between ">
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} />

                        <Label htmlFor={option} className=" cursor-pointer text-md">
                          {formatToUpperCase(option)}
                        </Label>
                        {/* Viet mot function de uppercase tu dau tien cuar label khi can */}
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField control={form.control} name="address" label="Address" fieldType={FormFieldType.INPUT} placeholder="42 Nguyễn Khuyến, phường 5, Quận Gò Vấp, thành phố Hồ Chí Minh" />
            <CustomFormField control={form.control} name="occupation" label="Occupation" fieldType={FormFieldType.INPUT} placeholder="Web Developer" />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField control={form.control} name="emergencyContactName" label="Emergency Contact Name" fieldType={FormFieldType.INPUT} placeholder="Guadian's Name" />
            <CustomFormField
              control={form.control}
              name="emergencyContactNumber"
              fieldType={FormFieldType.PHONE_INPUT}
              placeholder="(+84) 382195720"
              label="Emergency Contact Number"
              iconAlt="phone"
            />
          </div>
        </section>
        <section className=" space-y-4">
          <div className=" space-y-1">
            <h2 className=" sub-header">Medical Information</h2>
          </div>
          <CustomFormField control={form.control} name="primaryPhysician" label="Primary care Physician" fieldType={FormFieldType.SELECT} placeholder="Select a physician">
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className=" flex items-center gap-2 cursor-pointer">
                  <Image src={doctor.image} alt={doctor.name} width={24} height={24} className=" rounded-full  border border-dark-500" />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          .
          <div className=" flex flex-col gap-6 xl:flex-row">
            <CustomFormField control={form.control} name="insuranceProvider" label="Insurance Provider" fieldType={FormFieldType.INPUT} placeholder="Blue Cross" />
            <CustomFormField control={form.control} name="insurancePolicyNumber" label="Insurance Policy Number" fieldType={FormFieldType.INPUT} placeholder="ABC1234567" />
          </div>
          <div className=" flex flex-col gap-6 xl:flex-row">
            <CustomFormField control={form.control} name="allergies" label="Allergies (if any)" fieldType={FormFieldType.TEXTAREA} placeholder="Peanuts, Penicillin, Pollen" />
            <CustomFormField control={form.control} name="currentMedication" label="Current Medication" fieldType={FormFieldType.TEXTAREA} placeholder="Ibuprofen 200mg, Levothroxine 50mcg" />
          </div>
          <div className=" flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history (if relevant)"
              fieldType={FormFieldType.TEXTAREA}
              placeholder="Mother has breast cancer"
            />
            <CustomFormField control={form.control} name="pastMedicalHistory" label="Past Medical History" fieldType={FormFieldType.TEXTAREA} placeholder="Asthma diagnosis in childhood" />
          </div>
        </section>
        <section className=" space-y-4">
          <div className=" space-y-1">
            <h2 className=" sub-header">Identification and Verification</h2>
          </div>
          <CustomFormField control={form.control} name="identificationType" label="Identification type" fieldType={FormFieldType.SELECT} placeholder="Birth Certificate">
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField control={form.control} name="identificationNumber" label="Identification Number" fieldType={FormFieldType.INPUT} placeholder="1234567" />
          <CustomFormField
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy and Identification Document"
            fieldType={FormFieldType.SKELETON}
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className=" space-y-4">
          <div className=" space-y-1">
            <h2 className=" sub-header">Consent and Privacy</h2>
          </div>
          <CustomFormField control={form.control} name="treatmentConsent" fieldType={FormFieldType.CHECKBOX} label="I consent to receive treatment for my health condition." />
          <CustomFormField
            control={form.control}
            name="disclosureConsent"
            fieldType={FormFieldType.CHECKBOX}
            label="I consent to the use and disclosure of my health information for treatment purpose."
          />{" "}
          <CustomFormField control={form.control} name="privacyConsent" fieldType={FormFieldType.CHECKBOX} label="I acknowledge that I have reviewed and agree to the privacy policy." />
        </section>
        <SubmitButton isLoading={isLoading}>Let Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;

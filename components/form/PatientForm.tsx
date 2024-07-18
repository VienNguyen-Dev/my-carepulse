"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";

import CustomFormField from "./CustomFormField";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATEPICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skelton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };

      //TODO: handler data
      const newUser = await createUser(userData);
      if (newUser) return router.push(`/patients/${newUser.$id}/register`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-4">
        <section className=" space-y-4">
          <h1 className="header">Hi there</h1>
          <p className=" text-dark-700">Schedule your first apppointment</p>
        </section>
        <CustomFormField control={form.control} name="name" fieldType={FormFieldType.INPUT} placeholder="Nguyen Chi Vien" label="Full name" iconSrc="/assets/icons/user.svg" iconAlt="user" />
        <CustomFormField control={form.control} name="email" fieldType={FormFieldType.INPUT} placeholder="chivien107@gmail.com" label="Email" iconSrc="/assets/icons/email.svg" iconAlt="email" />
        <CustomFormField control={form.control} name="phone" fieldType={FormFieldType.PHONE_INPUT} placeholder="(+84) 382195720" label="Phone number" iconAlt="phone" />
        <SubmitButton isLoading={isLoading}>Let Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;

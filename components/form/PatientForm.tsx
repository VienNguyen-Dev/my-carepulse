"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";

import CustomFormField from "./CustomFormField";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

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
    const userData = {
      name,
      email,
      phone,
    };

    //TODO: handler data
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-4">
        <section className=" space-y-4">
          <h1 className="header">Hi there</h1>
          <p className=" text-dark-700">Schedule your first apppointment</p>
        </section>
        <CustomFormField control={form.control} name="name" fieldType={FormFieldType.INPUT} placeholder="Nguyen Chi Vien" label="Full name" iconSrc="/assets/icons/user.svg" iconAlt="user" />
        <CustomFormField control={form.control} name="name" fieldType={FormFieldType.INPUT} placeholder="chivien107@gmail.com" label="Email" iconSrc="/assets/icons/email.svg" iconAlt="email" />
        <CustomFormField control={form.control} name="phone" fieldType={FormFieldType.PHONE_INPUT} placeholder="(+84) 382195720" label="Phone number" iconAlt="phone" />
        <SubmitButton isLoading={isLoading}>Let Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;

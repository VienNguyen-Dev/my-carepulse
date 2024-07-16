import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldType } from "./PatientForm";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

export const RenderField = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const { fieldType, placeholder, iconAlt, iconSrc } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className=" rounded-md border bg-dark-400 flex border-dark-500">
          {iconSrc && <Image src={iconSrc} alt={iconAlt || "iconUSer"} className="ml-2" width={24} height={24} />}
          <FormControl>
            <Input placeholder={placeholder} fieldType={fieldType} {...field} className="border-0 shad-input" />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <div className=" rounded-md border bg-dark-400 border-dark-500">
          <PhoneInput
            defaultCountry="US"
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            fieldType={fieldType}
            placeholder={placeholder}
            {...field}
            className="input-phone"
            international
          />
        </div>
      );
  }
};
const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, label, fieldType } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
          <RenderField props={props} field={field} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

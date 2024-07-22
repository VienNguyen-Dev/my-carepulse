import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import DatePicker from "react-datepicker";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATEPICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skelton",
}

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
            <Input placeholder={placeholder} type={fieldType} {...field} className="border-0 shad-input" />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            type={fieldType}
            placeholder={placeholder}
            {...field}
            className="input-phone"
            international
          />
        </FormControl>
      );
    case FormFieldType.DATEPICKER:
      return (
        <div className="flex border rounded-md bg-dark-400 border-dark-500">
          <Image src={"/assets/icons/calendar.svg"} alt="calendar" width={32} height={32} className="ml-2" />
          <FormControl>
            <DatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "dd/MM/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className=" shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea type={fieldType} placeholder={placeholder} className="shad-textArea" {...field} disabled={props.disabled} />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex gap-2 items-center">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />

            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
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
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel className="shad-input-label">{label}</FormLabel>}
          <RenderField props={props} field={field} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

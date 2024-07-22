"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const path = usePathname();

  const setModal = () => {
    setOpen(false);
    router.push("/");
  };
  const encryptedKey = typeof window !== undefined ? localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_PASSKEY) {
        router.push("/admin");
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const validateKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (passkey === process.env.NEXT_PUBLIC_PASSKEY) {
        //encryot Pass key
        const encryptedKey = encryptKey(passkey);
        localStorage.setItem("accessKey", encryptedKey);
      } else {
        setError("Invalid passkey. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex items-start justify-between">
            Admin Access Verifition
            <Image src={"/assets/icons/close.svg"} alt="close" width={24} height={24} onClick={() => setModal()} />
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-dark-600">To access the admin page, please enter the passkey.</AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={passkey} onChange={setPasskey} className="shad-otp">
          <InputOTPGroup className="flex gap-2">
            <InputOTPSlot className="shad-otp-slot" index={0} />
            <InputOTPSlot className="shad-otp-slot" index={1} />
            <InputOTPSlot className="shad-otp-slot" index={2} />
            <InputOTPSlot className="shad-otp-slot" index={3} />
            <InputOTPSlot className="shad-otp-slot" index={4} />
            <InputOTPSlot className="shad-otp-slot" index={5} />
          </InputOTPGroup>
        </InputOTP>
        {error && <p className=" shad-error">{error}</p>}
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validateKey(e)} className="shad-primary-btn w-full">
            Enter Admin Panel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;

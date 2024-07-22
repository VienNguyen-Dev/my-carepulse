"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (file: File[]) => void;
}
//upload va luu tru tren appwrite or co the su dung oncloudinary de luu tru neu can
const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} alt="file-uploader" width={1000} height={1000} className=" object-cover overflow-hidden  max-h-[400px]" />
      ) : (
        <div className=" flex flex-col items-center gap-4">
          <Image src={"/assets/icons/upload.svg"} alt="iconUpload" width={40} height={40} className=" text-green-500" />
          <div className="file-upload_label">
            <p className=" text-14-regular">
              <span className=" text-green-500">Click to upload</span> or draw and drop
            </p>
            <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

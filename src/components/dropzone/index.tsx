"use client";
import React, { useState, useEffect } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import UploadIcon from "@/assets/images/icons/upload-doc.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface Props {
  acceptedFileTypes: {
    [key: string]: string[];
  };
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: () => void
  initialFiles?: File[];
}

const Dropzone: React.FC<Props> = ({ acceptedFileTypes, onDrop, initialFiles = [], onRemove }) => {
  const [files, setFiles] = useState<File[]>(initialFiles);


  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    onDrop(acceptedFiles);
  };

  const handleDelete = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    onRemove()
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: acceptedFileTypes,
    onDrop: handleDrop,
    multiple: false,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div>
      {files.length > 0 ? (
        <div className="mt-4">
          <h4 className="mb-2 font-semibold">Preview</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {files.map((file) => (
              <div key={file.name} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-auto rounded border"
                />
                <FontAwesomeIcon
                  icon={faClose}
                  className="absolute top-0 right-0 m-2 bg-red-500 text-white p-1 rounded cursor-pointer"
                  onClick={() => handleDelete(file)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="bg-gray-200 dark:bg-gray-300 custom-border h-[7rem] cursor-pointer p-3"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <Image src={UploadIcon} alt="upload icon" />
            <p>
              <span className="font-semibold text-primary-default">
                Click here to upload a file
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-black-default/50">PNG, JPG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;

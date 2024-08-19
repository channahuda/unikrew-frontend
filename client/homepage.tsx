"use client";

import { uploadEmployeesFile } from "@/network/upload.api";
import { ChangeEvent, useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log("FORM DATA", formData);
    const response = await uploadEmployeesFile(formData);
    console.log(response);
  };
  return (
    <div>
      <div className="flex justify-end mr-4">
        <label htmlFor="file-upload" className="cursor-pointer">
          <button>Upload Employee Information</button>
          <input
            className="hidden"
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}

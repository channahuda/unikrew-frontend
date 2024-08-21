"use client";

import Loading from "@/components/loading";
import SalaryList from "@/components/salary/salaryList";
import TabBar from "@/components/tabBar";
import { getSalaries } from "@/network/salary.api";
import { uploadEmployeesFile } from "@/network/upload.api";
import { SalaryProps } from "@/utils/interfaces";
import { ChangeEvent, useEffect, useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [salaries, setSalaries] = useState<SalaryProps[]>([]);

  useEffect(() => {
    getAllSalaries();
  }, []);

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
    const response = await uploadEmployeesFile(formData);
    console.log(response);
  };

  const getAllSalaries = async () => {
    const response = await getSalaries();
    setSalaries(response);
  };

  const tabOptions = {
    tabBarOptions: [
      {
        tabName: "Uploads",
        content: <div />,
      },
      {
        tabName: "Generated Salary Slips",
        content: <SalaryList salaries={salaries} />,
      },
      {
        tabName: "Logs",
        content: <div />,
      },
    ],
  };

  if (!salaries) return <Loading />;

  return (
    <div>
      <div className="flex justify-end mr-4">
        <div className="relative inline-block">
          <label htmlFor="file-upload" className="cursor-pointer">
            <button className="relative px-3 py-2">
              {file ? file.name : "Upload Excel"}
            </button>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <TabBar tabBarOptions={tabOptions.tabBarOptions} />
    </div>
  );
}

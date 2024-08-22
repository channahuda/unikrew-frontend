"use client";

import { downloadFiles, getFileNames } from "@/network/download.api";
import { useEffect, useState } from "react";
import Loading from "./loading";

const Uploads: React.FC = () => {
  const [filenames, setFilenames] = useState<string[]>();

  useEffect(() => {
    fetchFileNames();
  }, []);

  const fetchFileNames = async () => {
    const response = await getFileNames("uploads");
    setFilenames(response.filenames);
  };

  const download = async (fileName: string) => {
    const response = await downloadFiles(fileName);

    // Assuming response contains the download URL
    const downloadUrl = response.downloadUrl;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;

    // Set the download attribute with the filename you want
    anchor.download = fileName;

    // Append the anchor to the body (required for Firefox)
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  if (!filenames) return <Loading />;

  return (
    <div className="flex flex-col items-center">
      <div className="h-2 bg-white"></div>
      {filenames.map((filename, index) => (
        <p
          onClick={() => {
            download(`uploads/${filename}`);
          }}
          key={index}
          className="text-blue-500 underline hover:text-black hover:no-underline hover:cursor-pointer mt-2 mb-2"
        >
          {filename}
        </p>
      ))}
    </div>
  );
};

export default Uploads;

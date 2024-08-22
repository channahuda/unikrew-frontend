"use client";

import { getAllLogs } from "@/network/log.api";
import { LogProps } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import Loading from "./loading";

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogProps[]>();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await getAllLogs();
    setLogs(response);
  };

  if (!logs) return <Loading />;

  return (
    <div>
      {logs?.map((log, index) => (
        <div
          className="rounded-lg border border-gray-300 p-4 mb-4 mt-4"
          key={index}
        >
          <p className="font-bold flex justify-end">
            {new Date(log.date).toLocaleString()}
          </p>
          <p>{log.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Logs;

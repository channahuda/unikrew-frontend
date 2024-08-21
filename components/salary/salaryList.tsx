"use client";

import { convertSalaryMonthToString } from "@/utils/compute";
import SalarySlipPopup from "./salarySlipPopup";
import { useState } from "react";
import { SalaryListProps, SalaryProps } from "@/utils/interfaces";
import { IoOpenOutline } from "react-icons/io5";

const SalaryList: React.FC<SalaryListProps> = (props) => {
  const [showSalarySlipPopup, setShowSalarySlipPopup] =
    useState<boolean>(false);
  const [selectedSalary, setSelectedSalary] = useState<SalaryProps>();
  return (
    <div className="flex justify-between w-full p-2">
      <table className="w-full table-fixed">
        <thead className="font-bold mb-2">
          <tr>
            <th className="text-center text-base outline outline-gray-500 outline-1 h-8 bg-gray-300">
              Employee Email
            </th>
            <th className="text-center text-base outline outline-gray-500 outline-1 h-8 bg-gray-300">
              Month
            </th>
            <th className="text-center text-base outline outline-gray-500 outline-1 h-8 bg-gray-300">
              Salary Slip
            </th>
          </tr>
        </thead>
        <tbody>
          {props.salaries.map((salary, index) => (
            <tr key={index}>
              <td className="text-center outline outline-gray-500 outline-1 h-8">
                {salary.email}
              </td>
              <td className="text-center outline outline-gray-500 outline-1 h-8">
                {convertSalaryMonthToString(salary.month)}
              </td>
              <td
                onClick={() => {
                  setShowSalarySlipPopup(true);
                  setSelectedSalary(salary);
                }}
                className="flex justify-center items-center text-center outline outline-gray-500 outline-1 h-8"
              >
                <IoOpenOutline className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SalarySlipPopup
        show={showSalarySlipPopup}
        onClose={() => setShowSalarySlipPopup(false)}
        salary={selectedSalary!}
      />
    </div>
  );
};

export default SalaryList;

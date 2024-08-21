"use client";

import { getEmployeesByEmail } from "@/network/employee.api";
import { convertSalaryMonthToString } from "@/utils/compute";
import { EmployeeProps, SalaryProps } from "@/utils/interfaces";
import { useEffect, useRef, useState } from "react";
import BalanceSheet from "./balanceSheet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loading from "../loading";
import { toPng } from "html-to-image";

type Props = {
  show: boolean;
  onClose: () => void;
  salary: SalaryProps;
};

const SalarySlipPopup: React.FC<Props> = (props) => {
  const [employee, setEmployee] = useState<EmployeeProps>();
  const [totalNetPayable, setTotalNetPayable] = useState<number>();
  const contentRef = useRef<HTMLDivElement | null>(null);

  // const handleDownload = async () => {
  //   const element = contentRef.current;

  //   if (!element) {
  //     console.error("Element not found");
  //     return;
  //   }

  //   // Capture the entire content, including any overflow, using a higher scale
  //   const canvas = await html2canvas(element, {
  //     scale: 6, // Increase scale to improve quality
  //     useCORS: true,
  //     scrollX: 0, // Ensure no scrolling affects the capture
  //     scrollY: 0,
  //     x: 0, // Capture from the top-left corner
  //     y: 0,
  //     width: element.scrollWidth, // Use full element width
  //     height: element.scrollHeight, // Use full element height
  //     windowWidth: element.scrollWidth, // Set window width to element width
  //     windowHeight: element.scrollHeight, // Set window height to element height
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   const pdfWidth = canvas.width;
  //   const pdfHeight = canvas.height;

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: [pdfWidth, pdfHeight],
  //   });

  //   // Add the captured image to the PDF
  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //   // Save the PDF
  //   pdf.save("salary_slip.pdf");
  // };

  const handleDownload = () => {
    if (contentRef.current === null) {
      return;
    }

    toPng(contentRef.current)
      .then((dataUrl) => {
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("salary-slip.pdf");
      })
      .catch((err) => {
        console.error("Failed to take screenshot and save as PDF", err);
      });
  };

  useEffect(() => {
    if (props.show) {
      getEmployeeInformation();
      if (props.salary) {
        setTotalNetPayable(
          props.salary.basicSalary +
            props.salary.medicalAllowance +
            props.salary.transportAllowance -
            props.salary.taxDeduction
        );
      }
      document.body.style.overflow = "hidden";
    } else {
      setEmployee(undefined);
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when the component is unmounted
    return () => {
      setEmployee(undefined);
      document.body.style.overflow = "unset";
    };
  }, [props.show]);

  const getEmployeeInformation = async () => {
    const response = await getEmployeesByEmail(props.salary.email);
    setEmployee(response);
  };

  if (!props.show) return null;
  if (!employee)
    return (
      <div
        onClick={() => {
          props.onClose();
        }}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center z-50"
      >
        <div className="rounded-lg flex flex-col justify-center">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white w-full rounded-lg"
          >
            <div className="sticky top-0 bg-white z-50 py-0 flex justify-between rounded-lg items-center w-full">
              <h2 className="text-base font-bold text-center flex-grow mt-4 ">
                Salary Slip
              </h2>
              <button
                className="text-xl rounded-full -mt-8 -mr-2 h-8 w-8 border border-white font-bold"
                onClick={() => {
                  props.onClose();
                }}
              >
                x
              </button>
            </div>
            <Loading />
          </div>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => {
        props.onClose();
      }}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center z-50"
    >
      <div className="rounded-lg flex flex-col justify-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white w-full rounded-lg"
        >
          <div className="sticky top-0 bg-white z-50 py-0 flex justify-between rounded-lg items-center w-full">
            <h2 className="text-base font-bold text-center flex-grow mt-4 ">
              Salary Slip
            </h2>
            <button
              className="text-xl rounded-full -mt-8 -mr-2 h-8 w-8 border border-white font-bold"
              onClick={() => {
                props.onClose();
              }}
            >
              x
            </button>
          </div>
          <div className="p-3 text-base items-center overflow-auto no-scrollbar max-h-[85vh] w-[90vh]">
            <div className="p-3" ref={contentRef}>
              <div className="flex justify-between p-2">
                <h2 className="flex-col justify-between items-center">
                  ABC Company
                </h2>
                <div>
                  <p className="text-gray-500">Payslip for the month</p>
                  <p className="font-bold">
                    {convertSalaryMonthToString(props.salary.month)}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-400 mt-4 mb-2"></div>
              <p className="font-bold text-gray-500 p-2">
                Employee Information
              </p>
              <div className="flex justify-between w-72 p-2">
                <div className="text-gray-500">
                  <p>Name</p>
                  <p>Email</p>
                  <p>Designatiom</p>
                </div>
                <div>
                  <div className="flex">
                    <p className="text-gray-500 mr-2">:</p>
                    <p>{employee?.name ? employee?.name : ""}</p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-500 mr-2">:</p>
                    <p>{employee?.email ? employee?.email : ""}</p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-500 mr-2">:</p>
                    <p>{employee?.designation ? employee?.designation : ""}</p>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-500 mt-4 mb-4"></div>
              <BalanceSheet
                _id={props.salary._id}
                email={props.salary.email}
                month={props.salary.month}
                basicSalary={props.salary.basicSalary}
                transportAllowance={props.salary.transportAllowance}
                medicalAllowance={props.salary.medicalAllowance}
                taxDeduction={props.salary.taxDeduction}
              />
              <div className="mt-4 rounded-lg border border-gray-500 flex justify-between p-2">
                <p className="font-bold">Total Net Payable</p>
                <p>{totalNetPayable}</p>
              </div>
              <p className="text-gray-500 mt-4 flex justify-center">
                ** This is an automatically generated document and does not
                require any signatures **
              </p>
            </div>
            <div className="p-3">
              <button onClick={handleDownload} className="w-full py-2 mb-2">
                Download Pay Slip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipPopup;

import { SalaryProps } from "@/utils/interfaces";

const BalanceSheet: React.FC<SalaryProps> = (props) => {
  const grossEarnings: number =
    props.basicSalary + props.medicalAllowance + props.transportAllowance;
  return (
    <div className="rounded-lg border border-gray-400 flex justify-between w-full px-2">
      <div className="h-full">
        <table className="table-fixed ml-2 mt-2 mr-2 mb-2">
          <thead className="text-start font-bold">
            <tr>
              <th className="text-start pr-4">Earnings</th>
              <th className="text-start">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-4 p-1">Basic</td>
              <td className="p-1">{props.basicSalary}</td>
            </tr>
            <tr>
              <td className="pr-4 p-1">Transport Allowance</td>
              <td className="p-1">{props.transportAllowance}</td>
            </tr>
            <tr>
              <td className="pr-4 p-1">Medical Allowance</td>
              <td className="p-1">{props.medicalAllowance}</td>
            </tr>
            <tr className="bg-gray-300 rounded-lg">
              <td className="p-1">Gross Earnings</td>
              <td className="p-1">{grossEarnings}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="h-full">
        <table className="table-fixed ml-2 mt-2 mr-2 mb-2">
          <thead className="text-start font-bold">
            <tr>
              <th className="text-start pr-4">Deductions</th>
              <th className="text-start">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-4 p-1">Tax</td>
              <td className="p-1">{props.taxDeduction}</td>
            </tr>
            <tr>
              <td className="pr-4 text-white p-1">fdfs</td>
              <td className="text-white p-1">dsfsd</td>
            </tr>
            <tr>
              <td className="pr-4 text-white">csxcsc</td>
              <td className="text-white p-1">sdsfsdd</td>
            </tr>
            <tr className="bg-gray-300 rounded-lg">
              <td className="p-1 pr-4">Total Deductions</td>
              <td className="p-1">{props.taxDeduction}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="justify-between p-2">
        <div>
          <p className="mb-2">Earnings</p>
          <p>Basic</p>
          <p>Transport Allowance</p>
          <p>Medical Allowance</p>
        </div>
        <div></div>
      </div> */}
    </div>
  );
};

export default BalanceSheet;

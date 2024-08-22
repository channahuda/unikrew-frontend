"use server";

import { apiHelper } from "@/utils/services";

const route: string = `/upload`;

async function uploadEmployeesFile(params: any) {
  const data = await apiHelper({
    url: `${route}/uploadExcel`,
    method: `POST`,
    data: params,
  });
  console.log(data);
  return data;
}

export { uploadEmployeesFile };

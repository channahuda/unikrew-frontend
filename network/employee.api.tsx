"use server";

import { apiHelper } from "@/utils/services";

const route: string = `/employees`;

async function getEmployeesByEmail(params: string) {
  try {
    const data = await apiHelper({
      url: `${route}/findEmployeeByEmail?email=${params}`,
      method: `GET`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getEmployeesByEmail };

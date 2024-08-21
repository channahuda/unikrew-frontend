"use server";

import { apiHelper } from "@/utils/services";

const route: string = `/salary`;

async function getSalaries() {
  try {
    const data = await apiHelper({
      url: `${route}/getAllSalaries`,
      method: `GET`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getSalaries };

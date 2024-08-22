"use server";

import { apiHelper } from "@/utils/services";

const route: string = `/log`;

async function getAllLogs() {
  try {
    const data = await apiHelper({
      url: `${route}/getLogs`,
      method: `GET`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getAllLogs };

"use server";

import { apiHelper } from "@/utils/services";

const route: string = `/download`;

async function getFileNames(params: string) {
  try {
    const data = await apiHelper({
      url: `${route}/listFileNames?folderPath=${params}`,
      method: `GET`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function downloadFiles(params: string) {
  try {
    const data = await apiHelper({
      url: `${route}/downloadFile?filePath=${params}`,
      method: `GET`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getFileNames, downloadFiles };

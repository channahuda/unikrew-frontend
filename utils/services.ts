"use server";

import { ApiHelperProps } from "./interfaces";

const host: string = process.env.NEXT_PUBLIC_API_HOST || "";

export const apiHelper = async ({
  url,
  method,
  data,
  contentType,
}: ApiHelperProps) => {
  try {
    const response = await fetch(host + url, {
      method: method || "GET",
      headers: {
        // "Content-Type": contentType ? contentType : "application/json",
        // Authorization: `Bearer ${
        //   cookies().get("accessToken")?.value ||
        //   process.env.NEXT_PUBLIC_API_TOKEN
        // }`,
      },

      ...(method !== "GET" && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    const res: any = await response.json();
    if (res.header?.error) {
      throw Error(res.header.errorMessage);
    }
    return res;
  } catch (error: unknown) {
    // Properly type the error and log it
    if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("Unknown error:", error);
    }
  }
};

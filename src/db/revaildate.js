"use server";

import { revalidateTag } from "next/cache";

export default async function revalidate(path) {
  revalidateTag(path);
}

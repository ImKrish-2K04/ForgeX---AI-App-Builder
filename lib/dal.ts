import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

export const verifySession = cache(async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
});

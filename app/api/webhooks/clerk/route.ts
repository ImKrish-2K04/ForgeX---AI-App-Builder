// app/api/webhooks/clerk/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const evt = await verifyWebhook(req); // throws on bad signature — let it 400

  switch (evt.type) {
    case "user.created":
    case "user.updated": {
      const { id, email_addresses, first_name, image_url } = evt.data;
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email: email_addresses[0]?.email_address,
          name: first_name ?? undefined,
          imageUrl: image_url,
        },
        create: {
          clerkId: id,
          email: email_addresses[0]?.email_address,
          name: first_name ?? "",
          imageUrl: image_url,
        },
      });
      break;
    }
    case "user.deleted": {
      await prisma.user
        .delete({ where: { clerkId: evt.data.id! } })
        .catch(() => {});
      break;
    }
  }

  return new Response("ok", { status: 200 });
}

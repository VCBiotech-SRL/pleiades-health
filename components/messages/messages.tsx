import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import MessageCard from "./message-card";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Messages({
  limit,
  siteId,
}: {
  limit?: number;
  siteId: string;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const messages = await prisma.message.findMany({
    where: {
      site: {
        id: siteId,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return messages.length > 0 ? (
    <div className="py-10">
      <DataTable columns={columns} data={messages} />
    </div>
  ) : (
    <div className="flex flex-col items-center flex flex-col justify-center h-[calc(100vh-80px)]">
      <h1 className="font-cal text-4xl">No Messages Yet</h1>
      <Image
        alt="missing message"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any messages yet. Create one to get started.
      </p>
    </div>
  );
}

import { Header } from "@/components/header";
import Messages from "@/components/messages/messages";
import PlacholderCard from "@/components/placeholder-card";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AllMessages({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Header
            heading={`Mensajes enviados a ${data.name}`}
            text="Estos mensajes llegaron después de tu última revisión, ¡lo ideal es responder cuanto antes!"
          />
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }
        >
          <Messages siteId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

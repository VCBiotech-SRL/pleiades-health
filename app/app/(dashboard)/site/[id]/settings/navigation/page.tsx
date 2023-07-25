import { NavLinksForm } from "@/components/settings/nav-links-form";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const pages = await prisma.page.findMany({
    where: {
      siteId: params.id,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <NavLinksForm
        title={"Enlaces de tu página"}
        description={"Modifica los enlaces que aparecen en el navegador de tu página"}
        helpText={"Estos enlaces deben ir a páginas de tengas registradas"}
        pages={pages}
        siteId={params.id}
      />
    </div>
  );
}

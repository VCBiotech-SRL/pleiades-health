import { getSession } from "@/lib/auth";

export async function Greeter() {
  const session = await getSession();

  if (!session) {
    return <></>;
  }

  const firstName = session.user.name.split(" ")[0];

  return (
    <div className="flex gap-2 rounded justify-between w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-cal text-4xl font-bold dark:text-white text-primary tracking-wide">
          ¡ Hola, {firstName} !
        </h1>
        <h5 className="text-lg text-secondary-foreground">
          Este es el rendimiento de tus páginas y artículos. ¡Casi obtienes tu
          objetivo!
        </h5>
      </div>
    </div>
  );
}

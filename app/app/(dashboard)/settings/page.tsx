import { UpdateStringForm } from "@/components/form/update-string-form";
import { editUser } from "@/lib/actions/user";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Settings
        </h1>
        <UpdateStringForm
          title={"Nombre"}
          description={"Tu nombre en VCBiotech Health Community."}
          helpText={"Por favor, utiliza un máximo de 32 caractéres."}
          handleSubmit={editUser}
          inputAttrs={{
            name: "name",
            type: "string",
            defaultValue: session.user.name!,
            placeholder: "Miguel Calderon",
            maxLength: 32,
          }}
        />
        <UpdateStringForm
          title="Correo Electrónico"
          description="Aquí te enviaremos todas las informaciones que necesitas."
          helpText="Debe ser un correo electrónico válido."
          handleSubmit={editUser}
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: session.user.email!,
            placeholder: "miguel@shills-php.co",
          }}
        />
      </div>
    </div>
  );
}

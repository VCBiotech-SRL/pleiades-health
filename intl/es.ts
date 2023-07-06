// import { Dictionary } from ".";

export type Dictionary = {
  login: {
    title: string;
    subtitle: string;
  };
};

export const es = {
  login: {
    title: "Ingresa a tu cuenta",
    subtitle: "Utiliza uno de los siguientes proveedores para autentificarte",
  },
} satisfies Dictionary;

// import { Dictionary } from ".";

export type Dictionary = {
  login: {
    title: string;
    subtitle: string;
  };
  site: {
    createModal: {
      title: string;
      buttonText: string;
      form: {
        name: {
          label: string;
          placeholder: string;
        };
        subdomain: {
          label: string;
          placeholder: string;
        };
        description: {
          label: string;
          placeholder: string;
        };
      };
    };
  };
};

export const es = {
  login: {
    title: "Ingresa a tu cuenta",
    subtitle: "Utiliza uno de los siguientes proveedores para autentificarte",
  },
  site: {
    createModal: {
      title: "Crea una una página",
      buttonText: "Crear Página",
      form: {
        name: {
          label: "Nombre",
          placeholder: "Dr. Juan Pérez",
        },
        subdomain: {
          label: "Subdominio",
          placeholder: "dr-juan-perez",
        },
        description: {
          label: "Descripción",
          placeholder: "Consulta especializada del Dr. Pérez",
        },
      },
    },
  },
} satisfies Dictionary;

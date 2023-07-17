// import { Dictionary } from ".";

export type Dictionary = {
  login: {
    title: string;
    subtitle: string;
  };
  dashboard: {
    overview: {
      title: string;
      text: string;
    };
    sites: {
      title: string;
      text: string;
    };
    posts: {
      title: string;
      text: string;
    };
    messages: {
      title: string;
      text: string;
    };
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
  dashboard: {
    overview: {
      title: "Actividades",
      text: "Actividad de tus páginas en las últimas 24 horas",
    },
    sites: {
      title: "Páginas web",
      text: "",
    },
    posts: {
      title: "Publicaciones recientes",
      text: "",
    },
    messages: {
      title: "Tus mensajes",
      text: "",
    },
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

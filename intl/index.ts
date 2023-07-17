import { es } from "./es";

export type Dictionary = {
  login: {
    title: string;
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
};

export function intl() {
  return es;
}

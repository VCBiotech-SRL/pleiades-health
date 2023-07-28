"use client";

import {
  LandingHero1,
  simpleHero,
  SimpleHero1,
  SimpleHero2,
  SimpleHeroComponent,
} from "./hero";

type Prop = {
  name: string;
  value: string;
};

interface CustomComponent {
  component: SimpleHeroComponent;
  customProps: Prop[];
}

function parseProps(props: Prop[]) {
  const propsObject: { [k: string]: any } = {};
  props.forEach((prop) => {
    if (typeof prop.value === "object") {
      propsObject[prop.name] = parseProps(prop.value);
    }
    propsObject[prop.name] = prop.value;
  });
  return propsObject;
}

export function CustomComponent({ component, customProps }: CustomComponent) {
  const props = parseProps(customProps);
  if (component === "simpleHero1") {
    const result = simpleHero.safeParse(props);
    if (!result.success) {
      return <p>Props for this Simple Hero 1 component are not properly set</p>;
    }
    return <SimpleHero1 {...result.data} />;
  }

  if (component === "simpleHero2") {
    const result = simpleHero.safeParse(props);
    if (!result.success) {
      return <p>Props for this Simple Hero 2 component are not properly set</p>;
    }
    return <SimpleHero2 {...result.data} />;
  }

  if (component === "landingHero1") {
    const result = simpleHero.safeParse(props);
    if (!result.success) {
      return (
        <p>Props for this Landing Hero 1 component are not properly set</p>
      );
    }
    return <LandingHero1 {...result.data} />;
  }

  return <></>;
}

"use client";

import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import { intl } from "@/intl";
import { ReactNode } from "react";

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  const dict = intl().site.createModal;
  return (
    <Button onClick={() => modal?.show(children)}>{dict.buttonText}</Button>
  );
}

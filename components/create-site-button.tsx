"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { intl } from "@/intl";

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  const dict = intl().site.createModal;
  return (
    <Button
      onClick={() => modal?.show(children)}
    >
      {dict.buttonText}
    </Button>
  );
}

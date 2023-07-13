"use client";

import { Message, MessageStatus, Site } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import es from "date-fns/locale/es";

export const columns: ColumnDef<Message & { site: Site | null }>[] = [
  {
    accessorKey: "subject",
    header: "Título",
  },
  {
    accessorKey: "from",
    header: "Paciente",
  },
  {
    accessorKey: "content",
    header: "Contenido",
    cell: ({ row }) => {
      const content = (row.getValue("content") as string) ?? "";
      return content.slice(0, 50);
    },
  },
  {
    accessorKey: "starred",
    header: "Importante",
    cell: ({ row }) => {
      const starred = row.getValue("starred") as boolean;
      return starred ? "Urgente" : "Regular";
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as MessageStatus;
      return status === MessageStatus.NEW ? "Nuevo" : "Pendiente";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Enviado hace",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return formatDistance(date, new Date(), { locale: es }).replace(
        "alrededor de ",
        "",
      );
    },
  },
];

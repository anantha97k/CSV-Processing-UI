import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FileUpload = {
  id: string;
  time: string;
  status: "pending" | "processing" | "completed" | "failed";
  filename: string;
};

export const columns: ColumnDef<FileUpload>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-black"
      >
        {row.original.title}
      </Link>),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <span>{row.original.products.length}</span>
  },
  {
    id: "actions",
    cell: ({ row }) => <
      Delete
      iconType="delete" // or "trash"
      id={row.original._id}
    />
  }
]
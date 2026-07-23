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
        className="hover:text-black hover:border-b-2 hover:border-blue-700 pb-1 font-medium transition-colors"

      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <span>{row.original.products.length}</span>
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Delete
          item="collection"
          iconType="trash"
          id={row.original._id}
        />
      </div>
    )
  }
]
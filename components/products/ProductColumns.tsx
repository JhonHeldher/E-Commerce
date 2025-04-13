"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="hover:text-black hover:border-b-2 hover:border-blue-700 pb-1"
      >
        {row.original.title}
      </Link>),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => (
      <span>{
        row.original.collections.map((collection) => collection.title).join(", ")
      }</span>
    )
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <
      Delete
      item="product"
      iconType="delete" // or "trash"
      id={row.original._id}
    />
  }
]
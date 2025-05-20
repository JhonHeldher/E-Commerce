"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original._id}`}
        className="hover:text-black hover:border-b-2 hover:border-blue-700 pb-1"
      >
        {row.original._id}
      </Link>),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  }
]
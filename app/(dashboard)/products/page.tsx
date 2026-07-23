"use client"

import Loader from '@/components/custom ui/Loader'
import React, { useEffect, useState } from 'react'
import { DataTable } from "@/components/custom ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import { columns } from '@/components/products/ProductColumns';


const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductType[]>([])

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);

    } catch (err) {
      console.log("[products_GET]", err);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return loading ? <Loader /> : (
    <div className="px-10 py-8 max-w-7xl mx-auto max-sm:px-4">
      <div className="flex items-center justify-between">
        <p className="text-3xl text-gray-800 font-bold tracking-tight">Products</p>
        <Button
          onClick={() => router.push("/products/new")}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4" />
          <span className="mr-2">
            Create Products
          </span>
        </Button>
      </div>
      <Separator className="my-5 bg-gray-200" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  )
}

export default Products
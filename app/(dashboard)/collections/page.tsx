"use client"

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Collections = () => {
  const router = useRouter();

  const [Loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);

    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, [])



  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-[30px] text-gray-500 font-bold">Collections</p>
        <Button
          onClick={() => router.push("/collections/new")}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4" />
          <span className="mr-2">
            Create Collection
          </span>
        </Button>
      </div>
      <Separator className="my-4 bg-gray-200" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  )
}

export default Collections
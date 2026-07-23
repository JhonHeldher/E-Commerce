"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Separator } from "@/components/ui/separator";

import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="px-10 py-8 max-w-7xl mx-auto max-sm:px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-gray-800 font-bold tracking-tight">Collections</h1>
        <Button
          onClick={() => router.push("/collections/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Collection</span>
        </Button>
      </div>
      
      <Separator className="my-5 bg-gray-200" />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <DataTable columns={columns} data={collections} searchKey="title" />
      )}
    </div>
  );
};

export default Collections;
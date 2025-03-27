"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";

const CollectionDetails = () => {
    const { collectionId } = useParams() as { collectionId: string };

    const [loading, setLoading] = useState(true);
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${collectionId}`, {
                method: "GET",
            });
            const data = await res.json();
            setCollectionDetails(data);
            setLoading(false);

        } catch (err) {
            console.log("[collection_GET]", err);
        }
    };

    useEffect(() => {    
        getCollectionDetails();
    }, []);
    
  return loading ? <Loader/> : (
    <CollectionForm initialData={collectionDetails} />
  )
}

export default CollectionDetails
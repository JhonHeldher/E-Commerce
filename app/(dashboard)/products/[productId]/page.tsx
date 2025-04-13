"use client";

import Loader from '@/components/custom ui/Loader';
import ProductForm from '@/components/products/ProductForm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const { productId } = useParams() as { productId: string };


  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);

    } catch (err) {
      console.log("[product_GET]", err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return loading ? <Loader /> : (
    <ProductForm initialData={productDetails} />
  )
}

export default ProductDetails
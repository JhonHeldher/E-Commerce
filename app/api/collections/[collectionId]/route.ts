import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server"

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const resolvedParams = await params;
    await connectToDB();

    const product = await Product.findById(resolvedParams.productId).populate({ path: "collections", model: "Collection" });

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[product_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) => {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    // Aguarda os params serem resolvidos
    const resolvedParams = await params;

    let collection = await Collection.findById(resolvedParams.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      resolvedParams.collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collection_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) => {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    // Aguarda os params serem resolvidos
    const resolvedParams = await params;

    await Collection.findByIdAndDelete(resolvedParams.collectionId);

    await Product.updateMany({
      collections: resolvedParams.collectionId
    }, {
      $pull: { collections: resolvedParams.collectionId }
    });

    return new NextResponse("Collection deleted successfully", { status: 200 });
  } catch (err) {
    console.log("[collection_DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const dynamic = "force-dynamic";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server"

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const GET = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        // Aguarda os params serem resolvidos
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


export const dynamic = "force-dynamic";
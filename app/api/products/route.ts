import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const Post = async (req: NextRequest) => {
    try {
        const userId = await currentUser();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const { title, description, media, category, collection, tags, size, color, price, expense } = await req.json();


        if (!title || !description || !media || !category || !collection || !tags || !size || !color || !price || !expense) {
            return new NextResponse("Not enough data to create a product", { status: 400 });
        }

        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collection,
            tags,
            size,
            color,
            price,
            expense,
        });

        await newProduct.save();

        return NextResponse.json(newProduct, {
            status: 200
        })


    } catch (err) {
        console.log("[products_POST]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
};
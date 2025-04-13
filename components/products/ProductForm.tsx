"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../custom ui/ImageUpload"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Delete from "../custom ui/Delete";
import { X } from 'lucide-react';

import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";

import Loader from "../custom ui/Loader";



const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
    initialData?: ProductType | null
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState<CollectionType[]>([]);


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
            toast.error("Something went wrong! Please try again.");
        }
    };

    useEffect(() => {
        getCollections();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData, collections: initialData.collections.map(
                (collection) => collection._id
            )
        } : {
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            sizes: [],
            colors: [],
            price: 0.1,
            expense: 0.1,
        },
    })

    const handKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initialData
                ? `/api/products/${initialData._id}`
                : "/api/products";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Product ${initialData ? "updated" : "created"}`);
                window.location.href = "/products";
                router.push("/products");
            }
        } catch (err) {
            console.log("[products_POST]", err);
            toast.error("Something went wron! Please try again.");
        }
    }

    return loading ? <Loader /> : (
        <div className="text-gray-500 px-10 py-5">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                        Edit Product
                    </span>
                    <Delete
                        item="product"
                        iconType="trash" // or "delete"
                        id={initialData._id}
                    />
                </div>
            ) : (
                <span className="text-[30px] text-gray-500 font-bold">
                    Create Product
                </span>
            )}

            <Separator className="my-4 bg-gray-200 mb-15" />
            <div className="relative border shadow-xl border-gray-200 rounded-md p-10">
                <div className="absolute top-1 right-1 ">
                    <Button
                        type="button"
                        onClick={() => router.push("/products")}
                        className='cursor-pointer border-none bg-transparent text-gray-500 hover:text-red-600 transition-all shadow-none'

                    >
                        <X />
                    </Button>
                </div>
                <Form
                    {...form}

                >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><span>Title</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            className=" border-none border-gray-300  focus:ring-2 focus:ring-blue-200 focus:border-[1px] focus:outline-none"
                                            placeholder="Title"
                                            {...field}
                                            onKeyDown={handKeyPress}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><span>Description</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className=" border-none border-gray-300  focus:ring-2 focus:ring-blue-200 focus:border-[1px] focus:outline-none"
                                            placeholder="Description"
                                            {...field}
                                            onKeyDown={handKeyPress}
                                            rows={5}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="media"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Media</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={(urls) => field.onChange(urls)}
                                            onRemove={(url) =>
                                                field.onChange(field.value.filter((image) => image !== url))
                                            }
                                            multiple={true} // Permite múltiplos uploads
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />


                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><span>Price ($)</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className=" border-none border-gray-300  focus:ring-2 focus:ring-blue-200 focus:border-[1px] focus:outline-none"
                                                placeholder="Price"
                                                {...field}
                                                onKeyDown={handKeyPress}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expense"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><span>Expense ($)</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className=" border-none border-gray-300  focus:ring-2 focus:ring-blue-200 focus:border-[1px] focus:outline-none"
                                                placeholder="Expense"
                                                {...field}
                                                onKeyDown={handKeyPress}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><span>Category</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                className=" border-none border-gray-300  focus:ring-2 focus:ring-blue-200 focus:border-[1px] focus:outline-none"
                                                placeholder="Category"
                                                {...field}
                                                onKeyDown={handKeyPress}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel><span>Tags</span></FormLabel>
                                        <FormControl>
                                            <MultiText
                                                placeholder="Tags"
                                                value={field.value}
                                                onChange={(tag) => field.onChange([...field.value, tag])}
                                                onRemove={(tagToRemove) => field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            {collections.length > 0 && (
                                <FormField
                                    control={form.control}
                                    name="collections"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel><span>Collections</span></FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    placeholder="Collections"
                                                    collections={collections}
                                                    value={field.value}
                                                    onChange={(_id) => field.onChange([...field.value, _id])}
                                                    onRemove={(idToRemove) =>
                                                        field.onChange([...field.value.filter((collectionId) =>
                                                            collectionId !== idToRemove
                                                        )]
                                                        )}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="colors"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel><span>Colors</span></FormLabel>
                                        <FormControl>
                                            <MultiText
                                                placeholder="Colors"
                                                value={field.value}
                                                onChange={(color) => field.onChange([...field.value, color])}
                                                onRemove={(colorToRemove) =>
                                                    field.onChange([...field.value.filter((color) =>
                                                        color !== colorToRemove
                                                    )]
                                                    )}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sizes"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel><span>Sizes</span></FormLabel>
                                        <FormControl>
                                            <MultiText
                                                placeholder="Sizes"
                                                value={field.value}
                                                onChange={(size) => field.onChange([...field.value, size])}
                                                onRemove={(sizeToRemove) =>
                                                    field.onChange([...field.value.filter((size) =>
                                                        size !== sizeToRemove
                                                    )]
                                                    )}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                        </div>


                        <div className="flex justify-end items-end mt-auto">
                            <Button
                                type="submit"
                                className="cursor-pointer border-1 bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                <span>Submit</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div >
    )
}

export default ProductForm
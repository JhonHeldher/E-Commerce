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
import React, { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";


const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string(),
});

interface CollectionFormProps {
    initialData?: CollectionType | null
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
    const router = useRouter();

    const [Loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            image: "",
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
            const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Collection ${initialData ? "updated" : "created"}`);
                window.location.href = "/collections";
                router.push("/collections");
            }
        } catch (err) {
            console.log("[collections_POST]", err);
            toast.error("Something went wron! Please try again.");
        }
    }

    return (
        <div className="text-gray-500 px-10 py-5">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                        Edit Collection
                    </span>
                    <Delete
                        iconType="trash" // or "delete"
                        id={initialData._id}
                    />
                </div>
            ) : (
                <span className="text-[30px] text-gray-500 font-bold">
                    Create Collection
                </span>
            )}

            <Separator className="my-4 bg-gray-200 mb-15" />
            <div className="border shadow-xl border-gray-200 rounded-md p-10">
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
                                    <FormMessage />
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
                                            placeholder="description"
                                            {...field}
                                            onKeyDown={handKeyPress}
                                            rows={5}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><span>Image</span></FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value ? [field.value] : []}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="max-w-50 flex justify-between">
                            <Button
                                type="submit"
                                className="cursor-pointer border-1 bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                <span>Submit</span>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => router.push("/collections")}
                                className='cursor-pointer border-1 gray-blue-500 bg-transparent text-gray-500 hover:border-gray-700 hover:text-gray-700 transition-all'

                            >
                                <span>Discard</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div >
    )
}

export default CollectionForm
"use client"
import { CldUploadWidget } from 'next-cloudinary';
import { ImageUp, Trash } from 'lucide-react';

import { Button } from '../ui/button';
import Image from "next/image";


interface ImageUploadProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px]">
                        <div className="absolute top-0 right-0 z-10">
                            <Button
                                onClick={() => onRemove(url)}
                                type="button"
                                size="sm"
                                className="
                                        cursor-pointer h-7 w-8 m-1 border-2 border-transparent 
                                        text-gray-500 transition-all duration-300 
                                        hover:border-red-500 hover:text-red-500
                                      "
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            src={url}
                            alt="collection"
                            className="object-cover rounded-lg"
                            fill
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget
                uploadPreset="dsaf0knmf"
                options={{ showUploadMoreButton: false, showPoweredBy: false }}
                onSuccess={onUpload}
            >
                {({ open }) => {
                    return (
                        <Button type="button"
                            onClick={() => open()}
                            className='cursor-pointer w-50 border-2 border-blue-500 bg-transparent text-blue-500 hover:border-blue-700 hover:text-blue-600 transition-all'
                        >
                            <ImageUp className='h-4 w-4' />
                            <span className="mr-2">
                                Upload Image
                            </span>
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};
export default ImageUpload
"use client"

import React, { useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';


interface MultiSelectProps {
    placeholder: string;
    collections: CollectionType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, collections, value, onChange, onRemove }) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    let selected: CollectionType[]

    if (value.length === 0) {
        selected = []
    } else {
        selected = value.map((id) =>
            collections.find((collection) => collection._id === id)
        ) as CollectionType[]
    }
    const selectable = collections.filter(
        (collection) => !selected.includes(collection)
    );

    return (
        <Command
            className=' overflow-visible bg-white'>
            <div className="flex flex-col  border-none border-gray-300 rounded-md shadow-xs">
                <div className="flex-row ">
                    {selected.map((collection) => (
                        <Badge
                            key={collection._id}
                            onClick={() => onRemove(collection._id)}
                            className='cursor-pointer border m-1 border-gray-300 hover:border-red-400 hover:text-red-400 rounded-md'
                        >
                            {collection.title}
                        </Badge>
                    ))}
                </div>

                <CommandInput
                    placeholder={placeholder}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                />
            </div>
            <div className='relative mt-2'>
                {open && (
                    <CommandList>
                        <CommandGroup
                            className='
                                absolute w-full z-10 top-0 overflow-auto 
                                border:none rounded-md shadow-md        
                                outline-none
                            '
                        >
                            {selectable.length === 0 ? (
                                <div className="px-4 py-2 text-gray-400">No results</div>
                            ) : (
                                selectable.map((collection) => (
                                    <CommandItem
                                        key={collection._id}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onSelect={() => {
                                            onChange(collection._id);
                                            setInputValue("");
                                        }}
                                        className='cursor-pointer hover:bg-gray-100'
                                    >
                                        <span>{collection.title}</span>
                                    </CommandItem>
                                ))
                            )}
                        </CommandGroup>
                    </CommandList>
                )}
            </div>
        </Command>
    )
}

export default MultiSelect
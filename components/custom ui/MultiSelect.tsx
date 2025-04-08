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

    return (
        <Command
            className=' overflow-visible bg-white'>
            <div className="flex gap-1 flex-wrap border-none border-gray-300 rounded-md shadow-xs">
                {selected.map((collection) => (
                    <Badge
                        key={collection._id}
                        onClick={() => onRemove(collection._id)}
                        className='cursor-pointer'
                    >
                        {collection.title}
                    </Badge>
                ))}

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
                            {collections.map((collection) => (
                                <CommandItem
                                    key={collection._id}
                                    // value={collection.name}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onSelect={() => {
                                        onChange(collection._id);
                                        setInputValue("");
                                    }}
                                >
                                    <span>{collection.title}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                )}
            </div>
        </Command>
    )
}

export default MultiSelect
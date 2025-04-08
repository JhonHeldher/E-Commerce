"use client"

import React, { useState, useRef } from 'react'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

interface MultiTextProps {
  placeholder: string
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder, value,
  onChange, onRemove
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState("")

  const addTag = (item: string) => {
    const newTag = item.trim()

    if (newTag === "" || value.includes(newTag)) {
      setError(newTag === "" ? "Tag cannot be empty" : "Tag already added")
      return
    }

    onChange(newTag)
    setInputValue("")
    setError("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setError("") // Clear error when user starts typing
  }

  const handleBlur = () => {
    if (inputValue.trim() === "") return
    addTag(inputValue)
  }

  return (
    <>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="
          border-none border-gray-300  
          focus:ring-2 focus:ring-blue-200 
          focus:border-[1px] focus:outline-none
        "
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex max-h-15 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 gap-1 flex-wrap mt-1">
        {value.map((tag, index) => (
          <Badge
            key={index}
            className="
              flex items-center cursor-pointer 
              bg-gray-500 p-1 text-white hover:bg-gray-600
            "
            onClick={() => onRemove(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </>
  )
}

export default MultiText

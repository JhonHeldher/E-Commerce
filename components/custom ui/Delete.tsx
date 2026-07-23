"use client"

import React, { useState } from "react";
import { Trash2, Delete as DeleteIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  id: string;
  item: string;
  iconType?: "trash" | "delete";
}

const Delete: React.FC<DeleteProps> = ({ item, id, iconType = "trash" }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "product" ? "products" : "collections";
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemType}`;
        toast.success(`Successfully deleted ${item}!`);	
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const Icon = iconType === "trash" ? Trash2 : DeleteIcon;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost" 
          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
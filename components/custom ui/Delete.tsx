"use client"

import React, { useState } from "react";
import { Trash, Delete as DeleteIcon } from "lucide-react";

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
  iconType?: "trash" | "delete";
}

const Delete: React.FC<DeleteProps> = ({ id, iconType = "trash" }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = "/collections";
        toast.success("Collection deleted");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const Icon = iconType === "trash" ? Trash : DeleteIcon;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="
            cursor-pointer m-1 border-2 border-transparent 
            text-gray-500 transition-all duration-300 
            hover:border-red-500 hover:text-red-500
          "
        >
          <Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            <span>Are you absolutely sure?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>This action cannot be undone. This will permanently delete your collection.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <span>Cancel</span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-500 text-white">
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;

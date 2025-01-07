"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { useState, useEffect } from "react"
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const columns = [
    {
        accessorKey: "id",
        header: "No",
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: props => (
            <Link href={'https://'+props.getValue()}>{props.getValue()}</Link>
        ),
    },
    {
        accessorKey: "shortlink",
        header: "Short Link",
        cell: props => (
            <Link  href={'https://'+props.getValue()}>{props.getValue()}</Link>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: (props) => {
            const rawDate = new Date(props.getValue())
            const date = rawDate.toLocaleDateString()
            return <span>{date}</span>;
        },
    },
    {
        accessorKey: "id",
        header: "Delete",
        cell: props => (
            <Button variant='outline' onClick={() => handleDelete(props.getValue())}><Trash2/></Button>
        ),
    },
]

export function LinkTable() {
    const { data, error, isLoading } = useSWR("/api/shortlinks", fetcher);

    const table = useReactTable({
        data: data?.data || [], // Selalu pastikan data ada (gunakan array kosong jika undefined)
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Handle loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
    if (!data || !data.data || !data.data.length) {
        return <p>No data available</p>;
    }


    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/shortlinks/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        // Setelah data berhasil dihapus, refresh data dengan mutate
        mutate();
      } else {
        toast.error(result.message || "Failed to delete the link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("An error occurred while deleting the link");
    }
  };
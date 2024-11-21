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

export const columns = [
    {
        accessorKey: "no",
        header: "No",
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: props => (
            <Link href={props.getValue()}>{props.getValue()}</Link>
          ),
    },
    {
        accessorKey: "shortlink",
        header: "Short Link",
        cell: props => (
            <Link href={props.getValue()}>{props.getValue()}</Link>
          ),
    },
    {
        accessorKey: "qrcode",
        header: "QR Code",
    },
]
const data = [
    {
        no: 1,
        url: "youtube.com",
        shortlink: "bite.ninjabytes.net",
        qrcode: "."
    },
    {
        no: 1,
        url: "youtube.com",
        shortlink: "bite.ninjabytes.net",
        qrcode: "."
    },
    {
        no: 1,
        url: "youtube.com",
        shortlink: "bite.ninjabytes.net",
        qrcode: "."
    },
    {
        no: 1,
        url: "youtube.com",
        shortlink: "bite.ninjabytes.net",
        qrcode: "."
    },
    {
        no: 1,
        url: "youtube.com",
        shortlink: "bite.ninjabytes.net",
        qrcode: "."
    },
]

export function LinkTable() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

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
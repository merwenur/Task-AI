"use client"
import { Badge } from "@/components/ui/badge";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { ApiResponseOptions } from "../../../../../shared/types/responseType";
import { IUser } from "../../../../../shared/types/userTypes";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const UserTable = (props: Props) => {
  const { data, isLoading } =
    useSWR<SWRResponse<ApiResponseOptions<IUser[]>>>("/users");
  const users = data?.data?.data
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Register date</TableHead>
          <TableHead className="hidden sm:table-cell">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
             <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-20 h-5" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="w-20 h-5" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="w-20 h-5" />
                </TableCell>
                </TableRow>
                
            ))
          : users?.map((user) => (
              <TableRow key={user.id} className="bg-accent">
                <TableCell>
                  <div className="font-medium">
                    {user.name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {user.role}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;

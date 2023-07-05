"use client";

import { convertDate } from "@/src/lib/utils";
import fetcher from "@/src/lib/utils";
import useSWR from "swr";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  experience: number;
}

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const pageIncrease = () => {
    setPage((page) => page + 1);
  };
  const pageDecrease = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };
  const {
    data: employees,
    isLoading,
    error,
  } = useSWR<Employee, Error>(`/api/sluzba/${page}`, fetcher);
  // const res = await fetch("http://localhost:3000/api/sluzba/1");
  // const employees = await res.json();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Służba</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Imię</TableHead>
                <TableHead>Nazwisko</TableHead>
                <TableHead>Data urodzenia</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead className="text-right">Doświadczenie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">test</TableCell>
                        <TableCell>test</TableCell>
                        <TableCell>test</TableCell>
                        <TableCell>test</TableCell>
                        <TableCell className="text-right">test</TableCell>
                      </TableRow>
                    ))
                : employees.map((employee: Employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.firstName}
                      </TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{convertDate(employee.dateOfBirth)}</TableCell>
                      <TableCell>{employee.jobTitle}</TableCell>
                      <TableCell className="text-right">
                        {employee.experience}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <CardFooter className="flex justify-center items-center">
            <Button
              variant="outline"
              size="icon"
              className="m-0.5 mt-2"
              onClick={pageDecrease}
            >
              <ChevronLeft className="h-4 w-4 " />
            </Button>
            <Button variant="outline" size="icon" className="m-0.5 mt-2">
              {page}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="m-0.5 mt-2"
              onClick={pageIncrease}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
}

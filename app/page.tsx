"use client";

import { convertDate } from "@/src/lib/utils";
import fetcher from "@/src/lib/utils";
import useSWR from "swr";
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

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  experience: number;
}

export default function Home() {
  const {
    data: employees,
    isLoading,
    error,
  } = useSWR("/api/sluzba/1", fetcher);
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
              {isLoading ? (
                <TableRow key={1}>
                  <TableCell className="font-medium">test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell className="text-right">test</TableCell>
                </TableRow>
              ) : (
                employees.map((employee: Employee) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

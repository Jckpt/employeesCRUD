"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SearchFilters from "@/src/components/SearchFilters";
import EmployeeRow from "@/src/components/EmployeeRow";
import fetcher from "@/src/lib/utils";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import Employee from "@/src/lib/Employee";
import {
  Table,
  TableBody,
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
import EmployeeModal from "./EmployeeModal";
const EmployeeTable = () => {
  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState<Date>();
  const [search, setSearch] = useState<string>("");
  const pageIncrease = () => {
    setPage((page) => page + 1);
  };
  const pageDecrease = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const {
    data: employees,
    isLoading,
    error,
  } = useSWR<Employee, Error>(`/api/sluzba/${page}${``}`, fetcher);
  // TODO: Dodac search param ktore bedzie sie bralo z objektu ktory ma date i search
  console.log(employees);
  return (
    <Card className="overflow-x-auto md:w-1/2 w-full">
      <CardHeader className="flex-row justify-between">
        <div className="flex-col">
          <CardTitle>Służba zamku</CardTitle>
          <CardDescription>
            Członkowie służby zamku z bajki Piękna i Bestia
          </CardDescription>
        </div>
        <EmployeeModal />
      </CardHeader>
      <CardContent className="">
        <div className="flex">
          <SearchFilters
            date={date}
            handleDateChange={handleDateChange}
            search={search}
            handleSearchChange={handleSearchChange}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imię</TableHead>
              <TableHead>Nazwisko</TableHead>
              <TableHead>Data urodzenia</TableHead>
              <TableHead>Rola</TableHead>
              <TableHead className="text-right">Doświadczenie</TableHead>
              <TableHead className="w-7"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-[354px]">
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
                  <EmployeeRow employee={employee} key={employee.id} />
                ))}
          </TableBody>
        </Table>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="m-0.5"
            onClick={pageDecrease}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="m-0.5">
            {page}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="m-0.5"
            onClick={pageIncrease}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;

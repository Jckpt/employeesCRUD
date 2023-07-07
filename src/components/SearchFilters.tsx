import React from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import PopoverCalendar from "./PopoverCalendar";

interface Props {
  date: Date;
  handleDateChange: (date: Date) => void;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchFilters: React.FC<Props> = ({
  date,
  handleDateChange,
  search,
  handleSearchChange,
}) => {
  return (
    <>
      <PopoverCalendar date={date} handleDateChange={handleDateChange} />
      <div className="ml-2 flex w-[280px] items-center space-x-2">
        <Input
          type="search"
          placeholder="Szukaj"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
};

export default SearchFilters;

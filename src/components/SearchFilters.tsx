import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

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
    <form className="flex">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="ml-2 flex w-[280px] items-center space-x-2">
        <Input
          type="search"
          placeholder="Szukaj"
          value={search}
          onChange={handleSearchChange}
        />
        <Button type="submit">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchFilters;

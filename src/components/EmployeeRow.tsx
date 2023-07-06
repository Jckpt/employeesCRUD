import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Employee from "../lib/Employee";
import { convertDate } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
interface Props {
  employee: Employee;
}

const EmployeeRow: React.FC<Props> = ({
  employee: { firstName, lastName, dateOfBirth, experience, id, jobTitle },
}) => {
  const [showTrash, setShowTrash] = useState(false);

  return (
    <TableRow
      key={id}
      onMouseEnter={() => setShowTrash(true)}
      onMouseLeave={() => setShowTrash(false)}
    >
      <TableCell className="font-medium">{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{convertDate(dateOfBirth)}</TableCell>
      <TableCell>{jobTitle}</TableCell>
      <TableCell className="text-right">{experience}</TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="icon"
          className={`h-7 w-7 ${showTrash ? "visible" : "invisible"}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;

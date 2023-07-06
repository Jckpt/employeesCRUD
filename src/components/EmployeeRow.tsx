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
import { convertDate, sendDeleteRequest } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { useToast } from "@/components/ui/use-toast";
interface Props {
  employee: Employee;
  mutate: any;
}

const EmployeeRow: React.FC<Props> = ({
  employee: { firstName, lastName, dateOfBirth, experience, id, jobTitle },
  mutate,
}) => {
  const { toast } = useToast();
  const [showTrash, setShowTrash] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    "/api/sluzba",
    sendDeleteRequest /* options */
  );
  async function handleDelete(id: number) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const result = await trigger(
        {
          id,
        } /* options */
      );
      console.log(result);
      mutate();
      toast({
        title: "Usunięto pracownika",
      });
    } catch (e) {
      toast({
        title: "Coś poszło nie tak",
      });
    }
  }
  return (
    <TableRow
      key={id}
      onMouseEnter={() => setShowTrash(true)}
      onMouseLeave={() => setShowTrash(false)}
    >
      <TableCell className="font-medium capitalize">{firstName}</TableCell>
      <TableCell className="capitalize">{lastName}</TableCell>
      <TableCell>{convertDate(dateOfBirth)}</TableCell>
      <TableCell>{jobTitle}</TableCell>
      <TableCell className="text-right">{experience}</TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="icon"
          className={`h-7 w-7 ${showTrash ? "visible" : "invisible"}`}
          onClick={() => handleDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;

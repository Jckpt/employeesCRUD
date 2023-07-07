import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Plus, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as z from "zod";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { sendRequest } from "../lib/utils";
import { EmployeesResponse } from "../lib/Employee";
import { KeyedMutator } from "swr";

interface Props {
  mutate: KeyedMutator<EmployeesResponse>;
}
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Imię musi posiadać minimum 2 litery.",
    })
    .trim(),
  lastName: z
    .string()
    .min(2, {
      message: "Nazwisko musi posiadać minimum 2 litery.",
    })
    .trim(),
  dateOfBirth: z.date({
    required_error: "Proszę wybrać datę urodzenia.",
    invalid_type_error: "To nie jest data!",
  }),
  jobTitle: z
    .string()
    .min(2, {
      message: "Rola musi posiadać minimum 2 litery.",
    })
    .trim()
    .toLowerCase(),
  experience: z
    .string()
    .min(0, {
      message: "To nie liczba!",
    })
    .transform((arg) => parseInt(arg)),
});

const EmployeeModal: React.FC<Props> = ({ mutate }) => {
  const { toast } = useToast();
  const { trigger, isMutating } = useSWRMutation(
    "/api/sluzba",
    sendRequest /* options */
  );
  const toDate = new Date();
  const fromDate = new Date(
    toDate.getFullYear() - 100,
    toDate.getMonth(),
    toDate.getDate()
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      jobTitle: "",
      experience: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const result = await trigger(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          jobTitle: values.jobTitle,
          experience: values.experience,
        } /* options */
      );
      mutate();
      toast({
        title: "Dodano pracownika",
        description: `Dodano pracownika ${values.firstName} ${values.lastName} do listy pracowników.`,
      });
    } catch (e) {
      toast({
        title: "Coś poszło nie tak",
        description: `Nie udało się dodać pracownika ${values.firstName} ${values.lastName} do listy pracowników.`,
      });
    }
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj pracownika</DialogTitle>
          <DialogDescription>
            Wprowadź dane pracownika, aby dodać go do listy.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="Kowalski" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data urodzenia</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[375px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? field.value : undefined}
                        onSelect={(date: Date | undefined) => {
                          if (date) field.onChange(date);
                        }}
                        defaultMonth={field.value ? field.value : undefined}
                        disabled={(date: Date) => date > new Date()}
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromDate={fromDate}
                        toDate={toDate}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rola</FormLabel>
                  <FormControl>
                    <Input placeholder="kamerdyner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doświadczenie w latach</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isMutating} type="submit">
                Zatwierdź
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;

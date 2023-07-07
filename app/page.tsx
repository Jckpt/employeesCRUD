import EmployeeTable from "@/src/components/EmployeeTable";
export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="h-16 w-full bg-green-400">siema</header>
      <main className="flex flex-col items-center justify-between p-2 md:p-24">
        <EmployeeTable />
      </main>
    </div>
  );
}

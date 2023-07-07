interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  experience: number;
}

export interface EmployeesResponse {
  employees: Employee[];
  totalPages: number;
}

export default Employee;

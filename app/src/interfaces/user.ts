export interface UsersType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
}

export interface UserTableProps {
  users: UsersType[];
}

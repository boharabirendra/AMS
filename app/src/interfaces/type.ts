export interface UsersType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dob: string;
  role: string;
}

export interface UserTableProps {
  users: UsersType[];
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  dob: string;
  gender: string;
  role: string;
}

export interface RegisterFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  label: string;
}

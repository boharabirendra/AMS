import { useState } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../store/user/usersApiSlice";
import { RegisterAndUpdateUI } from "./RegisterAndUpdateUI";
import { useNavigate } from "react-router-dom";
import { FormData } from "../interfaces/type";

export const UpdateUserDetail = ({ id }: { id: number }) => {
  const [updateUser, { isLoading, error, isError }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const { data: user, isLoading: loading } = useGetUserByIdQuery(id);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    dob: "",
    gender: "",
    role: "",
  });

  if (!loading && user) {
    setFormData({ ...user });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(formData).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <RegisterAndUpdateUI
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      label={"Update"}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

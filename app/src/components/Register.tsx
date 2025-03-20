import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormData } from "../interfaces/type";
import { RegisterAndUpdateUI } from "./RegisterAndUpdateUI";
import { useCreateUserMutation } from "../store/user/usersApiSlice";

const RegisterForm = () => {
  const [createUser, { isLoading, error, isError }] = useCreateUserMutation();
  const navigate = useNavigate();

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
      await createUser(formData).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RegisterAndUpdateUI
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isError={isError}
        error={error}
        label={"Register"}
      />
      <div className="mt-6">
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;

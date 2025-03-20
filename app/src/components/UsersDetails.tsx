import { useState } from "react";
import {
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { UsersType } from "../interfaces/type";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserByIdMutation,
} from "../store/user/usersApiSlice";

export const UsersDetails = () => {
  const { data: users, refetch } = useGetUsersQuery();
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<UsersType>>({});

  const handleEdit = (user: UsersType) => {
    setEditingUserId(user.id);
    setEditFormData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      role: user.role,
      gender: user.gender,
      dob: user.dob,
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (editingUserId !== null) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = editFormData;
        await updateUser(rest).unwrap();
        setEditingUserId(null);
        setEditFormData({});
        refetch();
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const handleDelete = async (userId: number) => {
    await deleteUserById(userId).unwrap();
    refetch();
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Email",
                "Phone",
                "Address",
                "Role",
                "Gender",
                "Date of Birth",
                "Actions",
              ].map((tHeading, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {tHeading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.users?.map((user: UsersType) => (
              <tr key={user.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="firstName"
                        value={editFormData.firstName || ""}
                        onChange={handleChange}
                        className="w-1/2 px-2 py-1 text-sm border rounded"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editFormData.lastName || ""}
                        onChange={handleChange}
                        className="w-1/2 px-2 py-1 text-sm border rounded"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone || ""}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{user.phone}</div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address || ""}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{user.address}</div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <select
                      name="role"
                      value={editFormData.role || ""}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                    </select>
                  ) : (
                    <div className="text-sm text-gray-900">{user.role}</div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <select
                      name="gender"
                      value={editFormData.gender || ""}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="text-sm text-gray-900">{user.gender}</div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="date"
                      name="dob"
                      value={
                        editFormData.dob
                          ? new Date(editFormData.dob)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {new Date(user.dob).toLocaleDateString()}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  {editingUserId === user.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-900 cursor-pointer"
                        aria-label="Save"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                        aria-label="Cancel"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        aria-label="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                        aria-label="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersDetails;

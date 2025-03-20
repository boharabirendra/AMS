import { useNavigate } from "react-router-dom";

import UsersDetails from "./UsersDetails";
import { MenuSkeleton } from "./Menus";
import { useLogoutMutation } from "../store/user/usersApiSlice";
import { useGetMenusQuery } from "../store/permissions/userPermissionApiSlice";
import { Tabs } from "./Tabs";
import Panel from "./Ui/Panel";

const Dashboard = () => {
  const [logout] = useLogoutMutation();

  const { data: menusOptions, isLoading } = useGetMenusQuery();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="">
      <div className="px-6 py-4 flex justify-between items-center backdrop-blur-sm">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        {isLoading ? (
          <MenuSkeleton />
        ) : (
          <Tabs>
            {menusOptions?.menus &&
              menusOptions.menus.map((menu, index) => (
                <Panel key={index} panelName={menu}>
                  <div className="">
                    <div className="rounded-xl p-6 shadow-xl">
                      <UsersDetails />
                    </div>
                  </div>
                </Panel>
              ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

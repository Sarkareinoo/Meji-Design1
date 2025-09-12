import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SidebarLayout from "@/layouts/sidebar"; 
import Dashboard from "@/modules/dashboard";
import List from "@/modules/List/List";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <SidebarLayout>
          <Dashboard />
        </SidebarLayout>
      ),
    },
    
    {
      path: "/list",
      element: (
        <SidebarLayout>
          <List />
        </SidebarLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

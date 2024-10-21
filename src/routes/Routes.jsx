import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../layout/Root";
import Smtp from "../pages/Smtp";
import Customer from "../pages/Customer";
import Campaign from "../pages/Campaign";
import AddCampaign from "../pages/AddCampaign";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Statistics from "../pages/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/smtp",
        element: (
          <PrivateRoute>
            <Smtp />
          </PrivateRoute>
        ),
      },
      {
        path: "/customer",
        element: (
          <PrivateRoute>
            <Customer />
          </PrivateRoute>
        ),
      },
      {
        path: "/campaign",
        element: (
          <PrivateRoute>
            <Campaign />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-campaign",
        element: (
          <PrivateRoute>
            <AddCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/statistics",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;

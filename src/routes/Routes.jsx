import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Root from "../layout/Root";
import Smtp from "../pages/Smtp";
import Customer from "../pages/Customer";
import Campaign from "../pages/Campaign";
import AddCampaign from "../pages/AddCampaign";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/smtp",
        element: <Smtp />,
      },
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/campaign",
        element: <Campaign />,
      },
      {
        path: "/add-campaign",
        element: <AddCampaign />,
      },
    ],
  },
]);
export default router;

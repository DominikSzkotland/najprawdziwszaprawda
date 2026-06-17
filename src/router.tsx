import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Profile from "./profile/Profile";
import NewPost from "./newPost/NewPost";
import NotFoundPage from "./notFoundPage/NotFoundPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "newPost",
        element: <NewPost />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

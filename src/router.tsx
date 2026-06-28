import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Profile from "./profile/Profile";
import NewPost from "./newPost/NewPost";
import NotFoundPage from "./notFoundPage/NotFoundPage";
import PostsList from "./postList/PostList";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./loginForm/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <PostsList />,
      },
      {
        path: "postsList",
        element: <PostsList />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profile/:profileName",
            element: <Profile />,
          },
          {
            path: "newPost",
            element: <NewPost />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

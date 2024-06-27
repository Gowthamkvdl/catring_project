import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, AuthLayout } from "./components/layout/layout";
import HomePage from "./routes/homePage/homePage";
import AboutPage from "./routes/aboutPage/aboutPage";
import ContactPage from "./routes/contactPage/contactPage";
import LoginPage from "./routes/loginPage/loginPage";
import RegisterPage from "./routes/registerPage/registerPage";
import ProfilePage from "./routes/profilePage/profilePage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import ListPage from "./routes/listPage/listPage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import SinglePage from "./routes/singlepage/SinglePage";
import UserProfile from "./routes/userProfilePage/UserProfile";
import { listPageLoader, singlePageLoader } from "./lib/loader.js";
import PageNotFound from "./routes/pageNotFound/PageNotFound";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/new-post",
          element: <NewPostPage />,
        },
        {
          path: "/user-profile",
          element: <UserProfile />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/update-profile",
          element: <ProfileUpdatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

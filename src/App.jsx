import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./assets/pages/RootLayout/RootLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./assets/pages/ErrorPage.jsx";
import RestaurantDetails from "./assets/pages/RestaurantDetails/RestaurantDetails.jsx";
import Home from "./assets/pages/Home/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { uiActions } from "./store/slices/ui-slice.js";
import Checkout from "./assets/pages/Checkout/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":restaurantId",
        element: <RestaurantDetails />,
      },
      {
        path: ":restaurantId/checkout",
        element: <Checkout />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  const isLogin = useSelector((state) => state.ui.isLogin);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  user && dispatch(uiActions.setLoggedIn({ loggedIn: user.loggedIn }));

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

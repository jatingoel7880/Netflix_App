import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import PlayComponent from "./GptSearch/PlayComponent";
import Profile from "./Profile";
// import NowPlaying from "./AllMovies/NowPlaying";
import MovieCategoryPage from "./MovieCategoryPage";


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
   {
    path:"/category/:category",
    element:<MovieCategoryPage/>      
   },
    {
      // path: "/play",
      path: "/play/:movieId",
      element: <PlayComponent />,
    },
    { path: "/profile", 
      element: <Profile  /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

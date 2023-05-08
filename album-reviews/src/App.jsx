import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import AlbumsRootLayout from "./pages/AlbumsRoot";
import AlbumsPage from "./pages/Albums";
import AlbumDetailPage from "./pages/AlbumDetail";
import NewAlbumPage from "./pages/NewAlbum";
import EditAlbumPage from "./pages/EditAlbum";
import ArtistsPage from "./pages/Artists";
import ArtistDetailPage from "./pages/ArtistDetail";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "albums",
        element: <AlbumsRootLayout />,
        children: [
          {
            index: true,
            element: <AlbumsPage />,
            // loader: eventsLoader,
          },
          {
            path: ":albumID",
            id: "album-detail",
            // loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <AlbumDetailPage />,
                // action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditAlbumPage />,
                // action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewAlbumPage />,
            // action: manipulateEventAction,
          },
        ],
      },
      {
        path: "artists",
        element: <ArtistsPage />,
        children: [
          {
            path: ":artistID",
            element: <ArtistDetailPage />,
            // loader: artistDetailLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

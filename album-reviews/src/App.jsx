import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import AlbumsRootLayout from "./pages/AlbumsRoot";
import AlbumsPage, { loader as albumPageLoader } from "./pages/Albums";
import AlbumDetailPage, {
  loader as albumDetailLoader,
  action as actionFunction,
} from "./pages/AlbumDetail";
import NewAlbumPage from "./pages/NewAlbum";
import EditAlbumPage from "./pages/EditAlbum";
import ArtistsPage from "./pages/Artists";
import ArtistDetailPage from "./pages/ArtistDetail";
import ErrorPage from "./pages/Error";
import { action as albumFormAction } from "./components/UI/AlbumForm";
import { getAllAlbums, getAlbumDetail } from "./firebase/firestore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "albums",
        element: <AlbumsRootLayout />,
        children: [
          {
            index: true,
            element: <AlbumsPage />,
            loader: getAllAlbums,
          },
          {
            path: ":albumID",
            id: "album-detail",
            loader: albumDetailLoader,
            children: [
              {
                index: true,
                element: <AlbumDetailPage />,
                action: actionFunction,
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
            action: albumFormAction,
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

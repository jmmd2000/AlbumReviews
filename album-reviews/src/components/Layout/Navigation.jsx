import classes from "./Navigation.module.css";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../Auth/LoginForm";

// This is the navbar.
// It uses react-routers NavLink to navigate to different pages.
// Active state is managed with the isActive prop on the NavLinks.

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <header className={classes.navHeader}>
        <nav>
          <p className={classes.navTitle}>JamesReviewsMusic</p>
          <ul className={classes.navList}>
            <li className={classes.navListItem}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li className={classes.navListItem}>
              <NavLink
                to="albums"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Albums
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className={classes.navListItem}>
                <NavLink
                  to="albums/new"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  New Album
                </NavLink>
              </li>
            )}
            <li className={classes.navListItem}>
              <NavLink
                to="artists"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Artists
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <LoginForm />
    </>
  );
};

export default Navigation;

import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={classes.navHeader}>
      <nav>
        <ul className={classes.navList}>
          <li className={classes.navTitle}>JamesReviewsMusic</li>
          <li className={classes.navListItem}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={classes.navListItem}>
            <NavLink to="albums">Albums</NavLink>
          </li>
          <li className={classes.navListItem}>
            <NavLink to="albums/new">New Album</NavLink>
          </li>
          <li className={classes.navListItem}>
            <NavLink to="artists">Artists</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

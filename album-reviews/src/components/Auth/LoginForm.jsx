import classes from "./LoginForm.module.css";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SignIn, SignOut } from "@phosphor-icons/react";

// This component allows me to login to manage reviews.
// The icon is displayed and when clicked, the login form appears.
// The form disappears onMouseLeave.

const LoginForm = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);
  const [clickState, setClickState] = useState(false);

  // Toggle the click state to show or hide the login form.
  const clickHandler = () => {
    setClickState((prevState) => !prevState);
  };

  // When the login button is clicked, the password is checked via the toggleLogin function from the AuthContext.
  const loginHandler = () => {
    const password = document.getElementById("password").value;
    toggleLogin(password);
  };

  // Log out.
  const logoutHandler = () => {
    toggleLogin();
  };

  return (
    <div className={classes.loginForm}>
      {isLoggedIn ? (
        <SignOut
          size={32}
          color="white"
          weight="regular"
          onClick={logoutHandler}
        />
      ) : (
        <SignIn
          size={32}
          color="white"
          weight="regular"
          onClick={clickHandler}
          className={clickState ? classes.hide : classes.show}
        />
      )}
      <div
        className={clickState ? classes.show : classes.hide}
        onMouseLeave={clickHandler}
      >
        <input
          placeholder="Password..."
          type="password"
          id="password"
          className={classes.input}
        />
        <button
          onClick={loginHandler}
          className={classes.button}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

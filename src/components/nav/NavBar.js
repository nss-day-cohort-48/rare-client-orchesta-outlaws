import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../utils/auth";
import "./NavBar.css";
import Logo from "./rare.jpeg";

export const NavBar = () => {
  const history = useHistory();

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link to="/">
          <img className="navbar__logo" src={Logo} />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/posts">
          Posts
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/posts/my_posts">
          My Posts
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/categories">
          Category Manager
        </Link>
      </li>
      {localStorage.getItem("rare_user_id") !== null ? (
        <li className="nav-item">
          <button
            className="nav-link fakeLink"
            onClick={() => {
              logout();
              history.push({ pathname: "/" });
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </>
      )}{" "}
    </ul>
  );
};

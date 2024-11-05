import { Link, useNavigate } from "@tanstack/react-router";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

const SideNavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      const result = await profile();
      if (result.success) {
        dispatch(setUser(result.data));
        return;
      }

      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate({ to: "/login" });
    };

    if (token) {
      getProfile();
    }
  }, [dispatch, navigate, token]);

  const logout = (event) => {
    event.preventDefault();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/login" });
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light"
      style={{ width: "4.5rem" }}
    >
      <Link
        to="/"
        className="d-block p-3 link-dark text-decoration-none"
        title="Icon-only"
      >
        <svg className="bi" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="visually-hidden">Icon-only</span>
      </Link>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link active py-3 border-bottom"
            aria-current="page"
            title="Home"
          >
            <svg
              className="bi"
              width="24"
              height="24"
              role="img"
              aria-label="Home"
            >
              <use xlinkHref="#home"></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="nav-link py-3 border-bottom"
            title="Dashboard"
          >
            <svg
              className="bi"
              width="24"
              height="24"
              role="img"
              aria-label="Dashboard"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="nav-link py-3 border-bottom"
            title="Orders"
          >
            <svg
              className="bi"
              width="24"
              height="24"
              role="img"
              aria-label="Orders"
            >
              <use xlinkHref="#table"></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="nav-link py-3 border-bottom"
            title="Products"
          >
            <svg
              className="bi"
              width="24"
              height="24"
              role="img"
              aria-label="Products"
            >
              <use xlinkHref="#grid"></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            to="/customers"
            className="nav-link py-3 border-bottom"
            title="Customers"
          >
            <svg
              className="bi"
              width="24"
              height="24"
              role="img"
              aria-label="Customers"
            >
              <use xlinkHref="#people-circle"></use>
            </svg>
          </Link>
        </li>
      </ul>
      <div className="dropdown border-top">
        <a
          href="#"
          className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser3"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Image
            src="https://github.com/mdo.png"
            alt="User"
            width="24"
            height="24"
            roundedCircle
          />
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser3"
        >
          <li>
            <Link className="dropdown-item" to="/new-project">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={logout}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavigationBar;

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
import PropTypes from "prop-types";

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
        <img src="/public/images/logo.png" alt="" width="40" height="32" />
        <span className="visually-hidden">Icon-only</span>
      </Link>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link py-3 border-bottom"
            aria-current="page"
            title="Home"
          >
            <Image
              src="/public/images/Home.png"
              alt="Home Icon"
              width="30"
              height="30"
            />
          </Link>
        </li>
        <li>
          <Link to="/car" className="nav-link py-3 border-bottom" title="Car">
            <Image
              src="/public/images/Car.png"
              alt="Car Icon"
              width="30"
              height="30"
            />
          </Link>
        </li>
        <li>
          <Link
            to="/manufacture"
            className="nav-link py-3 border-bottom"
            title="Manufacture"
          >
            <Image
              src="/public/images/Manufacture.png"
              alt="Manufacture Icon"
              width="32"
              height="32"
            />
          </Link>
        </li>
        <li>
          <Link to="/spec" className="nav-link py-3 border-bottom" title="Spec">
            <Image
              src="/public/images/Spec.png"
              alt="Spec Icon"
              width="30"
              height="33"
            />
          </Link>
        </li>
        <li>
          <Link
            to="/option"
            className="nav-link py-3 border-bottom"
            title="Option"
          >
            <Image
              src="/public/images/Option.png"
              alt="Option Icon"
              width="30"
              height="33"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};
SideNavigationBar.propTypes = {
  sidenav: PropTypes.object,
};
export default SideNavigationBar;

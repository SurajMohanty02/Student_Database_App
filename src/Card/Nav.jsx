import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "./firebase";

const Nav = () => {
  const dispatch = useDispatch();

  const openmodal = () => {
    dispatch({
      type: "OPEN",
    });
  };

  return (
    <div className="header shadow bg-light text-dark text-light">
      <Link
        to="/"
        style={{ textDecoration: "none", color: "#111", fontWeight: "400" }}
      >
        <h1 style={{ fontSize: "25px", marginLeft: "10px" }}>StudentBase</h1>
      </Link>
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
      >
        <Link to="/Add-student">
          <button className="btn btn-danger">Add Student</button>
        </Link>

        <div
          className="register"
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          <p>Register/Login</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;

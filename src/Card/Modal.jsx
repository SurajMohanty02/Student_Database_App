import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import "./Modal.css";

const Modal = () => {
  const modal = useSelector((state) => state.DataReducer.modal);
  console.log(modal);
  const dispatch = useDispatch();

  const closemodal = () => {
    dispatch({
      type: "CLOSE",
    });
  };
  return (
    <div className="modals" onClick={() => closemodal}>
      {modal ? (
        <div className="modals__container">
          <div className="content">
            <span>Profile</span>
            <span>Logout</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Modal;

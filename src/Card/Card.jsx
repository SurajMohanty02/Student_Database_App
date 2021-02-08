import React, { useEffect, useState } from "react";
import "./Card.css";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import db from "./firebase";
import { Link } from "react-router-dom";
const Card = () => {
  const dispatch = useDispatch();
  const [getdata, setgetdata] = useState();
  const closemodal = () => {
    dispatch({
      type: "CLOSE",
    });
  };
  useEffect(() => {
    db.collection("student").onSnapshot((snapshot) => {
      setgetdata(
        snapshot.docs.map((info) => ({
          id: info.id,
          data: info.data(),
        }))
      );
    });
  }, []);
  const deleteitem = (id) => {
    db.collection("student").doc(id).delete();
  };
  const collectdata = (data) => {
    dispatch({
      type: "SELECTEDDATA",
      data,
    });
  };
  return (
    <div className="data" onClick={() => closemodal()}>
      {getdata
        ? getdata.map((data) => (
            <div className="box" key={data.id}>
              <img className="image" src={data.data.image} />

              <div className="layer">
                <MdDelete
                  fontSize="x-large"
                  id="top"
                  onClick={() => deleteitem(data.id)}
                />
                <h4>{data.data.name}</h4>
                <p>{data.data.bio}</p>
                <div className="buttons">
                  <Link
                    to={`/profile/${data.id}`}
                    style={{ marginRight: "10px" }}
                  >
                    <button className="btn btn-outline-light">Profile</button>
                  </Link>
                  <Link to={`/edit/${data.id}`}>
                    <button
                      className="btn btn-outline-light"
                      onClick={() => collectdata(data.data)}
                    >
                      Edit...
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Card;

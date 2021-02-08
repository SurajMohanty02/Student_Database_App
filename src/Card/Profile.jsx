import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import db from "./firebase";
import "./Profile.css";
const Profile = () => {
  const { id } = useParams();
  const [data, setdata] = React.useState([]);
  const { status } = useSelector((state) => state.DataReducer);
  console.log(status);
  useEffect(() => {
    var docRef = db.collection("student").doc(id);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setdata(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [id]);
  console.log(data);
  return (
    <div className="profile">
      <div className="containers">
        <div className="left__section">
          <img src={data.image} alt="" />
        </div>

        <div className="right__section">
          <div className="name">
            <span className="bold">Name:</span>
            <span>{data.name}</span>
          </div>
          <div className="email">
            <span className="bold">Email:</span>
            <span>{data.email}</span>
          </div>
          <div className="phone">
            <span className="bold">Phone:</span>
            <span>{data.phone}</span>
          </div>
          <div className="address">
            <div className="add1">
              <span className="bold">Address1:</span>
              <span>{data.add1}</span>
            </div>
            <div className="add2">
              <span className="bold">Address2:</span>
              <span>{data.add2}</span>
            </div>
          </div>
          <div className="bio">
            <span className="bold">Biodata:</span>
            <span>{data.bio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import db, { storage } from "./firebase";
const Edit = () => {
  const { data } = useSelector((state) => state.DataReducer);
  const [progress, setprogress] = useState();
  const [status, setstatus] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [image, setimage] = useState();
  const [input, setinput] = useState({
    username: data.name,
    bio: data.bio,
    add1: data.add1,
    add2: data.add2,
    phone: data.phone,
    email: data.email,
  });
  const handelimage = (e) => {
    if (e.target.name) {
      setimage(e.target.files[0]);
    }
  };
  const history = useHistory();
  const handelsubmit = (e) => {
    e.preventDefault();
    // console.log(input);
    if (image) {
      const uploadtask = storage.ref(`images/${image.name}`).put(image);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          setprogress(
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );

          if (progress < 100) {
            setstatus(false);
            console.log(progress);
            dispatch({
              type: "STATUS",
              status,
            });
          } else {
            setstatus(true);
            if (status) {
              dispatch({
                type: "STATUS",
                status,
              });
              //    history.push("/");
            }
          }
        },
        (error) => {
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("student").doc(id).update({
                name: input.username,
                bio: input.bio,
                add1: input.add1,
                add2: input.add2,
                phone: input.phone,
                email: input.email,
                image: url,
              });
            });

          history.push("/");
          setinput({
            username: "",
            bio: "",
            add1: "",
            add2: "",
            phone: "",
            email: "",
          });
          setimage("");
        }
      );
    } else {
      db.collection("student").doc(id).update({
        name: input.username,
        bio: input.bio,
        add1: input.add1,
        add2: input.add2,
        phone: input.phone,
        email: input.email,
      });
      history.push("/");
      setinput({
        username: "",
        bio: "",
        add1: "",
        add2: "",
        phone: "",
        email: "",
      });
    }
  };

  const handelinput = (e) => {
    let { name, value } = e.target;
    setinput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log(image);
  return (
    <div className="addstudent">
      <h1 style={{ fontSize: "25px" }}>Update Student data</h1>
      <div className="container">
        <form className="text-center" onSubmit={handelsubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter The Name"
              required
              onChange={handelinput}
              value={input.username}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter The PhoneNo"
              required
              onChange={handelinput}
              value={input.phone}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter The Email"
              onChange={handelinput}
              value={input.email}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="add1"
              className="form-control"
              placeholder="Enter The Address1"
              required
              onChange={handelinput}
              value={input.add1}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="add2"
              className="form-control"
              placeholder="Enter The Address2"
              onChange={handelinput}
              value={input.add2}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              name="bio"
              className="form-control"
              placeholder="Describe yourself about your qualification and dream"
              required
              onChange={handelinput}
              value={input.bio}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              title="image"
              onChange={handelimage}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

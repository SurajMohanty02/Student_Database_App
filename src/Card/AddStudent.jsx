import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import db, { storage } from "./firebase";

const AddStudent = () => {
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const [progressbar, setprogressbar] = useState();
  const [status, setstatus] = useState(false);
  const history = useHistory();
  const [input, setinput] = useState({
    username: "",
    bio: "",
    phone: "",
    email: "",
    add1: "",
    add2: "",
  });
  const handelinput = (e) => {
    let { name, value } = e.target;
    setinput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    dispatch({
      type: "STATUS",
      status: status,
    });
  }, []);
  const handelsubmit = (e) => {
    e.preventDefault();
    //console.log(input);
    if (image.name) {
      const UploadTask = storage.ref(`images/${image.name}`).put(image);
      UploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setprogressbar(progress);
          console.log(progress);
          if (progress < 100) {
            setstatus(false);
            dispatch({
              type: "STATUS",
              status,
            });
          } else {
            setstatus(true);
            history.push("/");
            dispatch({
              type: "STATUS",
              status,
            });
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
              db.collection("student").add({
                name: input.username,
                bio: input.bio,
                phone: input.phone,
                email: input.email,
                add1: input.add1,
                add2: input.add2,
                image: url,
              });
            });
        }
      );
      setinput({
        username: "",
        bio: "",
        phone: "",
        email: "",
        add1: "",
        add2: "",
      });
      console.log("Submited ");
      setimage("");
    } else {
      db.collection("student").add({
        name: input.username,
        bio: input.bio,
        phone: input.phone,
        email: input.email,
        add1: input.add1,
        add2: input.add2,
      });
      setinput({
        username: "",
        bio: "",
        phone: "",
        email: "",
        add1: "",
        add2: "",
      });
      console.log("Submited ");
    }
    setimage("");
  };
  const handelimage = (e) => {
    setimage(e.target.files[0]);
  };
  //console.log(image);
  const closemodal = () => {
    dispatch({
      type: "CLOSE",
    });
  };
  return (
    <div className="addstudent" onClick={() => closemodal()}>
      <h1 style={{ fontSize: "25px" }}>Add Student</h1>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

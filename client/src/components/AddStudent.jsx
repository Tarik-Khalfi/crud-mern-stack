/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import home from "../assets/home.png";
import Vector from "../assets/Vector.png";
import user from "../assets/user.png";
import "./AddStudent.css";
const AddStudent = () => {
  const [studentList, setStudentList] = useState([]);
  const [adminInfo, setAdminInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [enrollNumber, setEnrollNumber] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const addStudent = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("enrollNumber", enrollNumber);
    formData.append("phone", phone);

    try {
      const response = await Axios.post(
        "https://crud-mern-front-three.vercel.app/add",
        formData
      );
      console.log(response);
      const studentsResponse = await Axios.get(
        "https://deploy-mern-crud-098.vercel.app/students"
      );
      setStudentList(studentsResponse.data);
      navigate("/students");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Axios.get("https://deploy-mern-crud-098.vercel.app/admin-info")
      .then((res) => {
        console.log(res.data);
        setAdminInfo(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="titel">
            <h1>
              <span style={{ color: "#feb001" }}>|</span>
              CRUD OPERATION
            </h1>
          </div>
          {adminInfo && adminInfo.length > 0 && (
            <div>
              <div>
                <img
                  className="profil-img"
                  src={user}
                  style={{ width: "100px" }}
                  alt=""
                />
              </div>
              <div>
                <h2>{adminInfo[0].fullName}</h2>
              </div>
              <div>
                <h3
                  style={{
                    marginTop: "0px",
                    marginBottom: "110px",
                    color: "#feb001",
                  }}
                >
                  Admin
                </h3>
              </div>
              <div>
                <h3>
                  <img style={{ marginRight: "30px" }} src={home} alt="" />
                  Home{" "}
                </h3>
              </div>
              <div style={{ marginTop: "350px" }}>
                <h3>
                  Logout <img style={{ marginLeft: "30px" }} src={Vector} />
                </h3>
              </div>
            </div>
          )}
        </div>

        <div className="content">
          <div className="navbar">
            <div className="search-notif">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="search"
              />

              <label htmlFor="">
                <img src="" alt="" />
              </label>
            </div>
          </div>
          <div className="centered-text">
            <div>
              <div className="title-bar">
                <h1>Add Students </h1>
              </div>
              <div className="new-student">
                <h1 className="form-title">New Student</h1>
                <h3>First Name</h3> <br />
                <label className="name-label">
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="enter your first name"
                  />
                </label>
                <h3>Last Name</h3> <br />
                <label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="enter your last Name"
                  />
                </label>
                <h3>Email</h3> <br />
                <label>
                  <input
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email"
                  />
                </label>
                <h3>Phone</h3> <br />
                <label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={(e) => setPhone(Number(e.target.value))}
                    placeholder="enter your phone number"
                  />
                </label>
                <h3>Enroll Number</h3> <br />
                <label>
                  <input
                    type="text"
                    name="enrollNumber"
                    onChange={(e) => setEnrollNumber(Number(e.target.value))}
                    placeholder="enter your enrollement number"
                  />
                </label>
                <h3>Photo de profil </h3>
                <br />
                <label>
                  <div className="custom-file-input">
                    <label htmlFor="file-input" className="label">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_0_531)">
                            <path
                              d="M5.55 3.65L7.5 1.71V10.35C7.5 10.63 7.72 10.85 8 10.85C8.28 10.85 8.5 10.63 8.5 10.35V1.71L10.45 3.66C10.55 3.76 10.68 3.81 10.8 3.81C10.92 3.81 11.06 3.76 11.15 3.66C11.35 3.46 11.35 3.15 11.15 2.95L8.35 0.150002C8.31 0.100002 8.25 0.0600024 8.19 0.0400024C8.07 -0.00999756 7.93 -0.00999756 7.81 0.0400024C7.75 0.0600024 7.69 0.100002 7.65 0.150002L4.85 2.95C4.65 3.15 4.65 3.46 4.85 3.66C5.05 3.86 5.36 3.85 5.55 3.65Z"
                              fill="#9B9A9A"
                            />
                            <path
                              d="M15.5 9.32C15.22 9.32 15 9.54 15 9.82V13.5C15 14.33 14.33 15 13.5 15H2.5C1.67 15 1 14.33 1 13.5V9.82C1 9.54 0.78 9.32 0.5 9.32C0.22 9.32 0 9.54 0 9.82V13.5C0 14.88 1.12 16 2.5 16H13.5C14.88 16 16 14.88 16 13.5V9.82C16 9.54 15.78 9.32 15.5 9.32Z"
                              fill="#9B9A9A"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_531">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span style={{ color: "#414040" }}>
                          Glisser-dÃ©posez le fichier ici, ou{" "}
                        </span>
                        <span style={{ color: "#3980CD" }}>Parcourir</span>{" "}
                        <br />
                        Format JPG, JPEG ou PNG de moins de 1Mo
                      </div>
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </label>
                <br />
                <button
                  style={{ cursor: "pointer" }}
                  className="form-btn"
                  onClick={addStudent}
                >
                  ADD STUDENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;

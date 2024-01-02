import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import trash from "../assets/trash.png";
import home from "../assets/home.png";
import pen from "../assets/pen.png";
import Vector from "../assets/Vector.png";
import user from "../assets/user.png";
const StudentList = () => {
  const [student, setStudentList] = useState([]);
  const [adminInfo, setAdminInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(
      // "https://deploy-mern-crud-098.vercel.app/students"
              "http://localhost:8000/students"
    )
      .then((response) => {
        console.log(response);
        setStudentList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const deleteStudent = (id) => {
    Axios.delete(
      // `https://deploy-mern-crud-098.vercel.app/delete-user/${id}`
              `http://localhost:8000/delete-user/${id}`
    )
      .then((response) => {
        console.log(response.data);
        Axios.get(
          // "https://deploy-mern-crud-098.vercel.app/students"
                  "http://localhost:8000/students"
        )
          .then((response) => {
            setStudentList(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    Axios.get(
      // "https://deploy-mern-crud-098.vercel.app/admin-info"
              "http://localhost:8000/admin-info"
    )
      .then((res) => {
        console.log(res.data);
        setAdminInfo(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <div className="titel">
            <h1>
              <span style={{ color: "#feb001" }}>|</span> CRUD OPERATION
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
                <img src="" alt="Notification" />
              </label>
            </div>
          </div>
          <div className="centered-text">
            <div>
              <div className="title-bar">
                <h1>Students list</h1>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/add")}
                >
                  ADD NEW STUDENT
                </button>
              </div>

              <table className="students-table">
                <thead>
                  <tr>
                    <th className="invisible">Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Enroll number</th>
                    <th>Admission</th>
                    <th className="invisible">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {student.map((s, i) => (
                    <tr key={i} className="table-row">
                      <td>
                        <img
                          src={`http://localhost:8000/images/${s.image}`}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
                        {s.firstName} {s.lastName}
                      </td>
                      <td>{s.email}</td>
                      <td> 0{s.phone}</td>
                      <td> {s.enrollNumber}</td>
                      <td> {s.dateAdmission}</td>
                      <td>
                        <Link to={`/update/${s._id}`}>
                          <button
                            style={{
                              cursor: "pointer",
                              marginRight: "20px",
                              background: "url(pen)",
                            }}
                          >
                            <img src={pen} alt="" />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteStudent(s._id)}
                          style={{ background: "url(trash)" }}
                        >
                          <img src={trash} style={{ cursor: "pointer" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;

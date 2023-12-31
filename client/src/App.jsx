import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add" element={<AddStudent />} />

          <Route path="/students" element={<StudentList />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

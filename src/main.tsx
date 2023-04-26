import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentTable from "./components/student_table.tsx";
import CreateStudentForm from "./components/add_student.tsx";
import EditStudent from "./components/edit_student.tsx";
import StudentDetails from "./components/student_details.tsx";
import NavBar from "./components/navbar.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <div>
        <NavBar />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/create" element={<CreateStudentForm />} />
          <Route path="/update/:id" element={<EditStudent />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

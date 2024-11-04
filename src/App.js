import Registration from "./components/Registration";
import "./common-styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeListing from "./components/EmployeeListing";
import EmpCreate from "./components/EmpCreate";
import EmpEdit from "./components/EmpEdit";
import EmpDetails from "./components/EmpDetails";
function App() {
  return (
    <div className="common-styles">
      <ToastContainer></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route
            path="/registration"
            element={<Registration></Registration>}
          ></Route>
          <Route
            path="/emp/emplisting"
            element={<EmployeeListing></EmployeeListing>}
          ></Route>
          <Route path="/emp/create" element={<EmpCreate></EmpCreate>}></Route>
          <Route path="/emp/edit/:empid" element={<EmpEdit></EmpEdit>}></Route>
          <Route
            path="/emp/details/:empid"
            element={<EmpDetails></EmpDetails>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AdminDashboard from "./pages/admin/AdminDashboard";
import MyTasks from "./pages/employee/EmployeeDashboard";
import Login from "./pages/auth/Login";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AssignTaskSection from './components/sections/AssignTaskSection';
import EditProjectPage from "./pages/EditProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import CreateEmployeeSection from './components/sections/CreateEmployeeSection';
import TaskDetailsPage from "./pages/TaskDetailsPage";
import CreateEmployeeTaskPage from "./pages/employee/CreateEmployeeTaskPage";
import EmployeeTaskDetailsPage from "./pages/employee/EmployeeTaskDetailsPage";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProfileSection from "./components/sections/EmployeeProfileSection";
import BlockedPage from './pages/BlockedPage';
import CreateLeaveRequestPage from "./pages/employee/CreateLeaveRequestPage";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/my-tasks"
          element={<MyTasks />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/project/:id"
          element={<ProjectDetailsPage />}
        />

        <Route
          path="/admin/assign-task"
          element={<AssignTaskSection />}
        />

        <Route
          path="/admin/edit-project"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/edit-project/:id"
          element={<EditProjectPage />}
        />

        <Route
          path="/admin/create-project"
          element={<CreateProjectPage />}
        />

        <Route
          path="/admin/create-employee"
          element={<AdminDashboard />}
        />

        <Route
          path="/task/:id"
          element={<TaskDetailsPage />}
        />

        <Route
          path="/create-task"
          element={<CreateEmployeeTaskPage />}
        />

        <Route
          path="/my-tasks/:id"
          element={<EmployeeTaskDetailsPage />}
        />

        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="/profile"
          element={<EmployeeProfileSection />}
        />

        <Route
          path="/blocked"
          element={<BlockedPage />}
        />
        
        <Route
          path="/create-leave-request"
          element={<CreateLeaveRequestPage />}
        />


      </Routes>
    </BrowserRouter>

  );

}

export default App;
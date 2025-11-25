import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import PrivateRoute from './Routes/PrivateRoute';
import Dashboard from './pages/Admin/Dashboard';
import CreateTask from './pages/Admin/CreateTask';
import ManageTasks from './pages/Admin/ManageTasks';
import ManageUsers from './pages/Admin/ManageUsers';
import UserDashboard from './pages/Users/UserDashboard';
import MyTasks from './pages/Users/MyTasks';
import ViewTaskDetails from './pages/Users/ViewTaskDetails';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path='/signUp' element={<Signup/>} />


          {/* Admin Route */}
          <Route element={<PrivateRoute allowedRoles={['admin']}/>}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path= "/admin/tasks" element = {<ManageTasks/>} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path = "/admin/users"  element={<ManageUsers/>} />
          </Route>


          {/* Users Route */}
          <Route element={<PrivateRoute allowedRoles={['users']}/>}>
            <Route path="/users/dashboard" element={<UserDashboard />} />
            <Route path='/users/tasks' element={<MyTasks/>} />
            <Route path = {"/users/task-details/:id"} element = {<ViewTaskDetails/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

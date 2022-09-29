import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, createContext, useState } from 'react'
// import  Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MyProfile from './components/MyProfile';
import Register from './components/Register';
import Plot_list from "./components/Plot/Plot_list";
import User_list from './components/users/UserList';
// import Plot_inforamtion from "./components/Plot/Plot_information"
import Axios from 'axios';
import AddPlot from './components/Plot/AddPlot';

const AdminContext = createContext();

function App() {
  const [admin, setAdmin] = useState({
    admin_name: null,
    admin_id: null,
    admin_key: null,
    admin_email: null,
    sck: "1458cxW8sdfqC33383474xfsfw"
  })
  const [adminCheck, setAdminCheck] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fun = async () => {
      try {
        const token = localStorage.getItem("token");
        const access_token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role");
        if (token && access_token && role) {
          const getAdmin = await Axios({
            method: "get",
            url: "http://localhost:8080/advmap/api/authenticate",
            headers: {
              sck: admin.sck
            },
            params: {
              action_type: "admin_login_check",
              id: token,
              access_token: access_token,
              role: role
            }
          });
          if (getAdmin) {
            setIsLoaded(true)
            if (getAdmin.data.status === "success") {
              const adminData = getAdmin.data.data
              // console.log("adminData")
              setAdmin({
                admin_name: `${adminData.admin_name} ${adminData.admin_last_name}`,
                admin_id: adminData._id,
                admin_key: adminData.admin_unique_key,
                admin_email: adminData.admin_email,
                sck: "1458cxW8sdfqC33383474xfsfw",
              })
              setAdminCheck(true);
            } else {
              setAdminCheck(false)
            }
          } else {
            setAdminCheck(false)
          }
        } else {
          setIsLoaded(true)
          setAdminCheck(false)
        }
      } catch (error) {
        setIsLoaded(true)
        console.log(error);
        setAdminCheck(false)
      }
    }
    fun();
  }, [adminCheck]);

  // console.log(admin)
  if (isLoaded === false) {
    return (
      <div>
        Hello loading
      </div>
    )
  }


  return <AdminContext.Provider value={{
    admin,
    setAdmin,
    setAdminCheck,
    adminCheck
  }}>
    <Router basename={process.env.REACT_APP_PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/userList">
          <User_list />
        </Route>
        <Route path="/myProfile">
          <MyProfile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/all-plots">
          <Plot_list />
        </Route>
        <Route path="/add-plot">
          <AddPlot />
        </Route>
      </Switch>
    </Router>
  </AdminContext.Provider>
}

export default App;
export {
  AdminContext
} 

import { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { AdminContext } from '../App';
const Sidebar = () => {
    const Admin = useContext(AdminContext);
    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        Admin.setAdminCheck(false)
        Admin.setAdmin((old) => {
            return {
                ...old, admin_name: null,
                admin_id: null,
                admin_key: null,
                admin_email: null,
            }
        })
        history.push("/");
    }
    return (
        <>



            <div className="login-sidebar">
                <div className='logo text-center p-5'>
                    <img className="text-center" src="https://powerjokers.com/wp-content/uploads/elementor/thumbs/logo-top-po2d9z2re9qk56yurdz5lhrnt34bdwwg6v5ixpqcqo.png" alt="" />
                </div>
                <div className='set-width'>
                    <div className="menu">
                        <NavLink className="nav-item nav-link" to="/dashboard">Dashboard</NavLink>
                        {/* <NavLink className="nav-item nav-link" to="/myprofile">My Profile</NavLink> */}
                        <NavLink className="nav-item nav-link" to="/register">Add User</NavLink>
                        <NavLink className="nav-item nav-link" to="/userList">Users list</NavLink>
                        <NavLink className="nav-item nav-link" to="/all-plots">All Plots</NavLink>
                        <NavLink className="nav-item nav-link" to="/add-plot">Add Plot</NavLink>
                        {/* <NavLink className="nav-item nav-link" to="/">View Map</NavLink> */}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Sidebar;
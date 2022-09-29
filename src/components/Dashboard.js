import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import { AdminContext } from '../App';

const Dashboard = (props) => {
    const Admin = useContext(AdminContext);
    let history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {

    //     }
    //     else {
    //         history.push("/");
    //     }
    // }, [history])
    return (
        <div className="container-fluid dashboard-page">
            <div className="row">
                <div className="login-page d-md-flex">

                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-8">
                        <h1>Welcome Admin</h1>
                        <div>
                            <p>Admin Name : {Admin.admin.admin_name}</p>
                            <p>Admin Email : {Admin.admin.admin_email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

import React, { useState, useContext } from 'react'
import Icon from 'react-icons-kit';
import { eyeClosed } from 'react-icons-kit/oct/eyeClosed'
import { eye } from 'react-icons-kit/oct/eye'
// import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { AdminContext } from "../App"

const Login = (props) => {
  const Admin = useContext(AdminContext);
  // console.log(Admin)
  // const cookies = new Cookies();
  const [admin_email, setAdmin_email] = React.useState("")
  const [admin_password, setAdmin_password] = React.useState("")
  let history = useHistory();
  React.useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      history.push("/dashboard")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/advmap/api/api_admin_action?action_type=admin_login", {
    // const response = await fetch("https://poswejokersapi.allcmsdemo.com/advmap/api/api_admin_action?action_type=admin_login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        sck: "1458cxW8sdfqC33383474xfsfw",
      },
      body: JSON.stringify({ admin_email, admin_password })
    })
      .then((res) => (res.json()))

      .then((data) => {
        console.log(data)

        if (data.status === "success") {
          let admin = JSON.parse(data.data)
          localStorage.setItem("role", admin.role);
          localStorage.setItem("access_token", admin.admin_unique_key);
          localStorage.setItem("token", admin._id);
          Admin.setAdminCheck(true);
          Admin.setAdmin((old) => {
            return {
              ...old,
              admin_name: `${admin.admin_name} ${admin.admin_last_name}`,
              admin_id: admin._id,
              admin_key: admin.admin_unique_key,
              admin_email: admin.admin_email,
            }
          });
          history.push("/dashboard");
        }
        else {
          Admin.setAdminCheck(false);
          alert("Invalid credentials");
        }
      });
  }
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeClosed);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeClosed)
      setType('password')
    }
  }
  return (
    <div className="container login-page">
      <div className="row">
        <div className="login-page d-md-flex">
          <div className="col-md-4">
            <div className="login-sidebar">
              <img className="text-center" src="https://powerjokers.com/wp-content/uploads/elementor/thumbs/logo-top-po2d9z2re9qk56yurdz5lhrnt34bdwwg6v5ixpqcqo.png" alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <h3>Sign In</h3>

              <div className="mb-3">
                <input
                  type="admin_email"
                  className="form-control"
                  placeholder="Enter email"
                  value={admin_email}
                  onChange={(e) => setAdmin_email(e.target.value)}
                />
              </div>

              <div className="mb-3 d-flex set-ic">
                <input
                  type={type}
                  value={admin_password}
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setAdmin_password(e.target.value)}

                />
                <span onClick={handleToggle}><Icon icon={icon} size={22} /></span>
              </div>

              <div className="mb-3">
                {/* <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Remember me
                    </label>
                  </div> */}
              </div>

              <div className="d-grid">
                <button type="submit" className="login-signup">
                  Login
                </button>
              </div>
              <p className="forgot-admin_password text-right">

              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

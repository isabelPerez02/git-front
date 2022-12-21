import './Login.css'

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, showMessage } from "../../util/Util";
import image from '../../assets/img/logo2.svg'

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (localStorage.getItem("authData")) {
      navigate("/movies");
    }
  };

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };
  //1:000

  const handlesSubmit = async (event) => {
    event.preventDefault();
    const response = await sendAuthApi();
 
    if (response && response.token && response.token !== "") {
      localStorage.setItem("authData", JSON.stringify(response));
      navigate("/movies");
    } else {
      showMessage("Error", "Credenciales no validas", "error", "Reintentar");
    }
  };

  const sendAuthApi = async () => {
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    };
    let response = await fetch(API_URL + "auth", requestData);
    response = await response.json();
    return response;
  };

  return (
    <div id='login-container' className="row justify-content-center">
      <div className="col-8 col-sm-8 col-md-4 col-lg-3">
        <Form className="loginForm" onSubmit={handlesSubmit}>
          <img class="logo" src={image} alt="logo"></img>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="user"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Registra tu contraseña"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button className='primary' variant="primary" type="submit">
            Ingresar
          </Button>
        </Form>
        <Link className="linkDino" to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

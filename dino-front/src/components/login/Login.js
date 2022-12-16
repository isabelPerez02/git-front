import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../util/Util";

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
    console.log(response);
    if (response && response.token && response.token != "") {
      localStorage.setItem("authData", JSON.stringify(response));
      navigate("/movies");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Credenciales no validas",
        icon: "error",
        confirmButtonText: "Reintentar",
      });
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
    <div className="row justify-content-center">
      <div className="col-8 col-sm-8 col-md-4 col-lg-3">
        <Form onSubmit={handlesSubmit}>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Link to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

import "./Register.css";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { API_URL, showMessage } from "../../util/Util";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    birthDate: "",
    phone: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };
  //1:000

  const handlesSubmit = async (event) => {
    event.preventDefault();
    const response = await sendClientApi();

  };

  const sendClientApi = async () => {
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    };
     let response = await fetch(API_URL + "client", requestData);
    response = await response.json();
    if(response.status==true){
      showMessage("Usuario Creado", response.message, "success", "OK");
    }
    else if(response.status==false){
      showMessage("Error", response.message, "error", "Reintentar");
    }


    return response;
  };
   


  return (
    <div id="signup-container" className="container">
      <Form onSubmit={handlesSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombres"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellidos"
            name="lastName"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirthDate">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de Nacimiento"
            name="birthDate"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="text"
            placeholder="phone"
            name="phone"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            No compartiremos el email con nadie m??s
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Registra tu contrase??a"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button className="primary" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/">Ya tengo una cuenta</Link>
    </div>
  );
};

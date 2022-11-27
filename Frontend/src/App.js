import axios from "axios";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import swal from "sweetalert";

function App() {
  const {
    loginWithPopup,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  async function saveData(e) {
    e.preventDefault();

    const token = await getAccessTokenSilently();
    const user_email = user.email;
    const user_role = user["role/roles"][0];
    //message data
    const data = {
      message,
      user_email,
      subject,
      user_role,
    };
    console.log(data);
    const response = await axios
      .post("https://localhost:8070/messages/", data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        swal({
          title: "Success",
          text: "Message Successfully Saved",
          icon: "success",
          SuccessMode: true,
        });
      })
      .catch((error) => {
        swal("Oops", "Something went wrong!", "error");
      });
  }

  const [file, setFile] = useState([]);
  const [file_subject, setfileSubject] = useState("");

  function onFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const data = new FormData();

    data.append("file", file);
    data.append("subject", file_subject);
    data.append("user_email", user.email);
    data.append("user_role", user["role/roles"][0]);
    console.log(token);
    data.forEach((value, key) => {
      console.log(key + " " + value);
    });
    const response = await axios

      .post("https://localhost:8070/files/", data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        swal({
          title: "Success",
          text: "File Successfully Saved",
          icon: "success",
          SuccessMode: true,
        });
      })
      .catch((err) => {
        swal("Oops", "Something went wrong!", "error");
      });
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">SSD DASHBOARD</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!isAuthenticated && (
              <Button variant="primary" onClick={loginWithPopup}>
                Login
              </Button>
            )}
            {isAuthenticated && (
              <div className="d-flex gap-3">
                <Navbar.Text>
                  Signed in as: <a href="#login">{user.name}</a>
                </Navbar.Text>

                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isAuthenticated && (
        <div>
          <Container className="mb-5">
            <Card>
              <Card.Header className="text-center">
                {" "}
                <h3>SAVE A MESSAGE</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={saveData}>
                  <Form.Group controlId="formGridSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Type Message Here</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Save Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      )}
      {isAuthenticated && user["role/roles"][0] === "Manager" && (
        <div>
          <Container>
            <Card>
              <Card.Header className="text-center">
                {" "}
                <h3>FILE SUBMISSION</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="formFileSubject" className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      onChange={(e) => {
                        setfileSubject(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select a File</Form.Label>
                    <Form.Control type="file" onChange={onFileChange} />
                  </Form.Group>
                  <div className="d-grid ">
                    <Button
                      type="submit"
                      className=""
                      size="lg"
                      variant="primary"
                    >
                      Save File
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
}

export default App;

import React, { useState } from "react";
import Form from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './LoginPage.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function LoginPage() {
    const [username, setUsername] = useState("");

    function validateForm() {
    //Check if the user id is already in database, if no, then create new entry in database
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
    return (
        <div className="Login">
        <Form>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </Form>
        {/* <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
    </Form> */}
        </div>
    )
}

import { useEffect, useState, useContext } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import UserContext from './UserContext';
import './App.css'; 

const socket = io('http://localhost:3001', { autoConnect: false });

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [socketId, setSocketId] = useState('');

  function chat() {
    socket.auth = { username: name };
    setUser(name);

    socket.connect();
    navigate('/chat');
  }

  return (
    <div className="login-container"> 
        <Container>
            <Form className="login-form">
            <Form.Control type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <Button onClick={e => chat()}>Submit</Button>
            </Form>
        </Container>
    </div>

  );
}

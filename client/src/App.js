import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {UserProvider} from './UserContext';

import Login from './Login'
import ChatTab from './Chat'



function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

   return (
    <UserProvider value = {{user, setUser}}>
      <BrowserRouter>        
        <Container fluid>  
          <Routes>
            <Route path='/' element = {<Login/>} />
            <Route path='/chat' element={<ChatTab/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
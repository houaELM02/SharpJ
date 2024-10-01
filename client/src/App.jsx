import Test from './Test.jsx';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import Signup from './components/Signup'
import Employe from './components/Employe'
import Accueil from './pages/Accueil'
import Invite from './pages/Invite'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'
import Dashboard from './pages/Dashboard'
import NewEntreprise from './components/NewEntreprise'
import ForgetP from './pages/ForgetP'
import ResteP from './components/ResteP'



function App() {
  const [userid, setUserid] = useState(null);
  const [param, setParam] = useState(null);
  const {user} = useAuthContext()
  console.log(user)



  return (
    <>
        <Router>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/NewEntreprise' element={<NewEntreprise />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/employe/registerEmploye" element={<Employe />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Invite" element={<Invite />} />
        <Route path="/Dashboard" element={!user ?<Login /> : <Test userid={user.userId} />} />

        <Route path="/ForgetPassword" element={<ForgetP />} />
        <Route path="/account/resetPassword" element={<ResteP />} />
        </Routes>
      </Router>
      {/* {param === null ? (
        <>
          <input 
            type="text" 
            value={userid} 
            onChange={(event) => setUserid(event.target.value)} 
          />
          <button onClick={() => setParam(1)}>Connect</button>
        </>
      ) : (
        <Test userid={userid} />
      )} */}

    </>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext';

import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="955260282795-26bhjl5pkdnk55j661ivq9s4qe0cf8ri.apps.googleusercontent.com">
    <AuthContextProvider>
      <App isloggedin={true}/>
    </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)

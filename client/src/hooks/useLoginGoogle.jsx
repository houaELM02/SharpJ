import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom"; 

export const useLoginGoogle = () => {
    const { dispatch } = useAuthContext();
    const Navigate = useNavigate(); 
  
    const checkEntreprise = async (data) => {
      try {
        const id = data.userId;
        const response = await axios.get(`http://localhost:5130/api/Employe/${id}`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        
        if(response.status === 204){
          return false;
        }
        else{
        return response;}
      } catch (error) {
        console.log('error');
      }
    };
  
    const LoginGoogle = async (credential) => {
      try {
          const jsonPayload = JSON.stringify(credential);
          const response = await axios.post('http://localhost:5130/api/Account/loginwithGoogle', jsonPayload, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          const { data } = response;
          console.log(data);
          if (data.flag === true) {
              dispatch({ type: "LOGIN", payload: { userId: data.userId, token: data.token } });
              const entrepriseResponse = await checkEntreprise(data);
              localStorage.setItem("user", JSON.stringify(data.token));
  
              Swal.fire({
                  icon: "success",
                  title: "Login Successful",
                  text: "You have successfully logged in!",
              });
  
              if (entrepriseResponse === false) {
                  Navigate('/Accueil');
              } else {
                  Navigate('/Dashboard');
              }
          } else {
              // Handle the situation where `data.flag` is not true
              Swal.fire({
                  icon: "error",
                  title: "Login Failed",
                  text: "Login flag was false.",
              });
          }
      } catch (error) {
          Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: error.response?.data?.error || "An error occurred during login.",
          });
      }
  };
  
  return { LoginGoogle };
  
  };
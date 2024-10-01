import React, { createContext, useEffect, useReducer } from "react";

export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state,user: action.payload };
      case 'LOGOUT':
        return { user: null };
      
      default:
        return state;
    }
  };

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          dispatch({
            type: 'LOGIN',
            payload: {userId: user.userId , token: user.token }
          });
         
        }
      }, []);

      return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {children}
        </AuthContext.Provider>
      );
    };
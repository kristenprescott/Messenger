import React, { createContext, useReducer, useContext } from "react";

// Context
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Set token in localStorage:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      // Remove token from localStorage:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

// Hooks
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

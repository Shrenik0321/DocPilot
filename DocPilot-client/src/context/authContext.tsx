import React from "react";

type AuthContextType = {
  authUser: {};
};

export const AuthContext = React.createContext<AuthContextType>({
  authUser: {},
});

export function AuthContextProvider({ children }: any) {
  const initialState: AuthContextType = {
    authUser: {},
  };

  const authReducer = (state: any, action: any) => {
    switch (action.type) {
      case "LOGIN":
        return { authUser: action.payload };
      case "LOGOUT":
        return { authUser: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

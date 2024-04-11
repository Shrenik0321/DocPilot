import { AuthContext } from "@/context/authContext";
import React from "react";

export function useAuth() {
  return React.useContext(AuthContext);
}

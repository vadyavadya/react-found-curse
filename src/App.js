import React, { useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";

export default function App() {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuth(true);
    }
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={
      {
        isAuth,
        setAuth,
        isLoading,
      }
    }>
      <AppRouter />
    </AuthContext.Provider>
  )
}


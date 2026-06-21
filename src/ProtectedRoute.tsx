import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../utils/supabase";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

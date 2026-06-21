import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Navigate } from "react-router-dom";
import LoginForm from "./loginForm/LoginForm";
import ProfileMainPage from "./profileMainPage/ProfileMainPage";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<String | null>(null);
  useEffect(() => {
    const checkUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        setEmail(user?.email ?? null);
        if (error) throw error;
      } catch (error) {
        console.log("error przy pobieraniu sesji", error);
      } finally {
        setLoading(false);
      }
    };
    checkUserData();
  }, [Navigate]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="mainPage">
      {email ? (
        <ProfileMainPage></ProfileMainPage>
      ) : (
        <LoginForm onLogin={setEmail}></LoginForm>
      )}
    </div>
  );
}

export default Profile;

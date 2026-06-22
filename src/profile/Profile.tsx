import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Błąd podczas wylogowywania:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <p>To twój profil - Jesteś zalogowany</p>
      <button onClick={handleLogout} className="logout-button">
        Wyloguj się
      </button>
    </div>
  );
}

export default Profile;

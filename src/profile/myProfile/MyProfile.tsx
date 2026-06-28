import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";

interface ProfileData {
  id: string;
  profile_name: string;
  display_name: string;
  avatar_url: string;
  date_of_birth: string;
}

interface MyProfileProps {
  profile: ProfileData;
}

const MyProfile = ({ profile }: MyProfileProps) => {
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
    <>
      <h1>{profile.display_name}</h1>
      <button onClick={handleLogout}>Wyloguj</button>
    </>
  );
};

export default MyProfile;

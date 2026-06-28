import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabase";

import AlienProfileCard from "./alienProfileCard/AlienProfileCard";
import MyProfile from "./myProfile/MyProfile";

interface ProfileData {
  id: string;
  profile_name: string;
  display_name: string;
  avatar_url: string;
  date_of_birth: string;
}

function Profile() {
  const { profileName } = useParams();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) return;

        const profileNameToLoad = profileName ?? user.id;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq(profileName ? "profile_name" : "id", profileNameToLoad)
          .single();

        if (error) throw error;

        setProfile(data);

        setIsOwner(user.id === data.id);
      } catch (error) {
        console.error("Błąd podczas pobierania profilu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [profileName]);

  if (loading) return <p>Ładowanie...</p>;
  if (!profile) return <p>Nie znaleziono profilu</p>;

  return isOwner ? (
    <MyProfile profile={profile} />
  ) : (
    <AlienProfileCard profile={profile} />
  );
}

export default Profile;

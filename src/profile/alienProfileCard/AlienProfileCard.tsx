interface ProfileData {
  id: string;
  profile_name: string;
  display_name: string;
  avatar_url: string;
  date_of_birth: string;
}

interface AlienProfileCardProps {
  profile: ProfileData;
}

const AlienProfileCard = ({ profile }: AlienProfileCardProps) => {
  return (
    <>
      <h1>{profile.display_name}</h1>
    </>
  );
};

export default AlienProfileCard;

import { Link } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="username" />
        <input type="file" placeholder="avatar image" />
        <input type="date" placeholder="date of birth" />
      </form>
    </div>
  );
};

export default ProfileSettings;

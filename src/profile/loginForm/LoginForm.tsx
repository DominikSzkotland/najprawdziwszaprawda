import { useState } from "react";
import { supabase } from "../../../utils/supabase";

type LoginFormProps = {
  onLogin: (email: string | null) => void;
};

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>();

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      setErrorMessage(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      onLogin(data.user?.email ?? null);
    } catch (error) {
      setErrorMessage("Błędny email lub/i hasło");
      onLogin(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />

      <button type="submit">Login</button>
      {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
    </form>
  );
};

export default LoginForm;

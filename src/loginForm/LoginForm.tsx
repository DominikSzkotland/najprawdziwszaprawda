import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import VerifyEmail from "./verifyEmail/VerifyEmail";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setinfoMessage] = useState<string | null>(null);
  const [loginOrSignup, setLoginOrSignup] = useState<"login" | "signup">(
    "login",
  );
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const isPasswordValid =
    hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSpecialChar;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    if (loginOrSignup === "login") {
      try {
        setErrorMessage(null);

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        navigate(from, { replace: true });
      } catch (error) {
        setErrorMessage("Błędny email lub/i hasło");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        if (password !== repeatedPassword) {
          throw new Error("Hasła nie są takie same!");
        }

        if (!isPasswordValid) {
          throw new Error("Hasło nie spełnia wymagań");
        }

        setErrorMessage(null);

        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        setRegisteredEmail(email);
        setAwaitingVerification(true);
      } catch (error) {
        setErrorMessage(
          "Rejestracja nie udana, sprawdź wymagania hasła i dane",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setRepeatedPassword("");
    setErrorMessage(null);
    if (loginOrSignup === "login") {
      setinfoMessage("Podaj swój mail i hasło aby się zalogować");
    } else {
      setinfoMessage(
        "Utwórz konto. Hasło musi spełniać wymagania bezpieczeństwa.",
      );
    }
  }, [loginOrSignup]);

  const Rule = ({ ok, text }: { ok: boolean; text: string }) => (
    <p style={{ color: ok ? "green" : "red" }}>
      {ok ? "✔" : "✖"} {text}
    </p>
  );

  if (loading) return <p>Loading...</p>;
  if (awaitingVerification) {
    return <VerifyEmail email={registeredEmail} />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginSignUpButtons">
          <button
            type="button"
            className={loginOrSignup === "login" ? "active" : ""}
            onClick={() => setLoginOrSignup("login")}
          >
            Log in
          </button>

          <button
            type="button"
            className={loginOrSignup === "signup" ? "active" : ""}
            onClick={() => setLoginOrSignup("signup")}
          >
            Sign up
          </button>
        </div>
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

        {loginOrSignup === "signup" && (
          <input
            type="password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            placeholder="repeat password"
            required
          />
        )}

        <button className="submitButton" type="submit">
          {loginOrSignup === "login" ? "Log in" : "Sign up"}
        </button>
        {loginOrSignup === "signup" && (
          <div className="rulesBox" style={{ marginTop: "10px" }}>
            <Rule ok={hasMinLength} text="Minimum 8 znaków" />
            <Rule ok={hasLowercase} text="Przynajmniej jedna mała litera" />
            <Rule ok={hasUppercase} text="Przynajmniej jedna wielka litera" />
            <Rule ok={hasNumber} text="Przynajmniej jedna cyfra" />
            <Rule
              ok={hasSpecialChar}
              text="Przynajmniej jeden znak specjalny"
            />
          </div>
        )}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        {infoMessage && <p className="infoMessage">{infoMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

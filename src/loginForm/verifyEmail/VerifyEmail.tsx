import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

type VerifyEmailProps = {
  email: string;
};

const VerifyEmail = ({ email }: VerifyEmailProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user.email_confirmed_at) {
        navigate("/profile");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) throw error;

      setMessage("Wysłano nową wiadomość aktywacyjną.");
    } catch (error) {
      console.log(error);
      setMessage("Nie udało się wysłać wiadomości ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verifyPage">
      <div className="verifyCard">
        <div className="verifyBadge">VERIFY EMAIL</div>

        <h2 className="verifyTitle">Potwierdź swój adres e-mail</h2>

        <p className="verifyText">Wysłaliśmy wiadomość na adres:</p>

        <div className="verifyEmail">{email}</div>

        <p className="verifyText">
          Kliknij link w wiadomości, aby aktywować konto. Jeśli nie widzisz
          maila — sprawdź spam lub poczekaj kilka minut.
        </p>

        <button
          className="verifyButton"
          onClick={resendVerificationEmail}
          disabled={loading}
        >
          {loading ? "Wysyłanie..." : "Wyślij ponownie"}
        </button>

        {message && <p className="verifyMessage">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;

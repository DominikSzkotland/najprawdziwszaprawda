import { Link, useLocation } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const location = useLocation();

  const currentURL =
    window.location.origin + location.pathname + location.search;

  return (
    <div className="notFoundPage">
      <div className="notFoundCard">
        <div className="errorBadge">404</div>

        <h1 className="notFoundTitle">Strona nie została znaleziona</h1>

        <p className="notFoundText">
          Adres, który próbujesz otworzyć, nie istnieje lub został przeniesiony.
        </p>

        <div className="urlBox">{currentURL}</div>

        <Link to="/" className="homeButton">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

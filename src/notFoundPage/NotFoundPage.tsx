import { Link, useLocation } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const location = useLocation();
  const currentURL = `${window.location.origin}${location.pathname}${location.search}`;
  return (
    <div className="main">
      <h1>
        Strony po adresem: <br />
        <span className="currentLinkName">{currentURL}</span>
        <br /> niestety nie znaleziono
      </h1>
      <h2>
        Wróć na <Link to="/">stronę główną</Link>
      </h2>
    </div>
  );
}

export default NotFoundPage;

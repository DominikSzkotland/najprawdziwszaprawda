import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="main">
      <h1>
        Strony po adresem: <br />
        <span className="currentLinkName">{location.href}</span>
        <br /> niestety nie znaleziono
      </h1>
      <h2>
        Wróć na <Link to="/">stronę główną</Link>
      </h2>
    </div>
  );
}

export default NotFoundPage;

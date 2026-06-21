import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../assets/close.png";
import listIcon from "../assets/list.png";
import universalUserIcon from "../assets/unversalUser.png";
import addDocumentIcon from "../assets/addDocument.png";

function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <nav className="navigationMainBar">
      <button
        className="menuButton"
        onClick={toggleMenu}
        style={{
          backgroundImage: `url(${isMenuOpened ? closeIcon : listIcon})`,
        }}
      ></button>

      <div className="titleLink">
        <Link to="/" onClick={() => setIsMenuOpened(false)}>
          Najprawdziwsza Prawda
        </Link>
      </div>

      <button
        onClick={() => navigate("/newPost")}
        className="addPostIcon"
        style={{ backgroundImage: `url(${addDocumentIcon})` }}
      ></button>

      <button
        onClick={() => navigate("/profile")}
        className="profileIcon"
        style={{ backgroundImage: `url(${universalUserIcon})` }}
      ></button>

      {isMenuOpened && (
        <ul className="menu">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Strona Główna
            </Link>
          </li>
          <li>
            <Link to="postsList" onClick={toggleMenu}>
              Wszystkie posty
            </Link>
          </li>
          <li>
            <Link to="/fakty" onClick={toggleMenu}>
              Fakty
            </Link>
          </li>
          <li>
            <Link to="/kontakt" onClick={toggleMenu}>
              Kontakt
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

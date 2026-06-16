import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.ts";
import "./App.css";
import closeIcon from "./assets/close.png";
import listIcon from "./assets/list.png";
import universalUserIcon from "./assets/unversalUser.png";
import addDocumentIcon from "./assets/addDocument.png";
interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string | null;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigateToProfilePage = (newlink: URL) => {
    location.assign(newlink);
  };

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data) setPosts(data);
      } catch (error: any) {
        console.error("Błąd podczas pobierania artykułów:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  if (loading) return <p>Ładowanie najprawdziwszej prawdy...</p>;

  return (
    <div className="mainPage">
      <nav className="navigationMainBar">
        <button
          className="menuButton"
          onClick={toggleMenu}
          style={{
            backgroundImage: `url(${isMenuOpened ? closeIcon : listIcon})`,
          }}
        ></button>
        <div className="titleLink">
          <a href="/">Najprawdziwsza Prawda</a>
        </div>
        <button
          onClick={() => {
            navigateToProfilePage(new URL("http://localhost:5173/#newPost/"));
          }}
          className="addPostIcon"
          style={{ backgroundImage: `url(${addDocumentIcon})` }}
        ></button>
        <button
          onClick={() => {
            navigateToProfilePage(new URL("http://localhost:5173/#profile/"));
          }}
          className="profileIcon"
          style={{ backgroundImage: `url(${universalUserIcon})` }}
        ></button>

        {isMenuOpened && (
          <ul className="menu">
            <li>
              <a href="#gotowanie">Gotowanie</a>
            </li>
            <li>
              <a href="#sport">Sport</a>
            </li>
            <li>
              <a href="#fakty">Fakty</a>
            </li>
            <li>
              <a href="#kontakt">Kontakt</a>
            </li>
          </ul>
        )}
      </nav>

      {posts.length === 0 ? (
        <p>Brak artykułów. Dodaj coś w panelu Supabase!</p>
      ) : (
        posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <small>
              Opublikowano: {new Date(post.created_at).toLocaleDateString()}
            </small>
            {post.image_url && <img src={post.image_url} alt={post.title} />}

            <p>{post.content}</p>
            <hr />
          </article>
        ))
      )}
    </div>
  );
}

export default App;

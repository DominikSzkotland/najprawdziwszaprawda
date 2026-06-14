import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.ts";

interface Post {
  id: string; // lub number, zależy co wybrałeś w Supabase
  created_at: string;
  title: string;
  content: string;
  image_url: string | null;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);

        // Pobieramy dane z tabeli 'posts'
        const { data, error } = await supabase
          .from("posts")
          .select("*") // pobierz wszystkie kolumny
          .order("created_at", { ascending: false }); // od najnowszych

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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Najprawdziwsza Prawda</h1>

      {posts.length === 0 ? (
        <p>Brak artykułów. Dodaj coś w panelu Supabase!</p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            style={{ borderBottom: "1px solid #ccc", padding: "20px 0" }}
          >
            <h2>{post.title}</h2>
            <small>
              Opublikowano: {new Date(post.created_at).toLocaleDateString()}
            </small>

            {/* Jeśli w bazie podasz link do mema z Storage, wyświetli się obrazek */}
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                style={{ maxWidth: "100%", display: "block", margin: "15px 0" }}
              />
            )}

            <p>{post.content}</p>
          </article>
        ))
      )}
    </div>
  );
}

export default App;

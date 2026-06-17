import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase.ts";

interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string | null;
}

document.title = "Najprawdziwsza Prawda - Blog";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Błąd pobierania:", error.message);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  if (loading) return <p>Ładowanie najprawdziwszej prawdy...</p>;
  if (posts.length === 0)
    return <p>Brak artykułów. Dodaj coś w panelu Supabase!</p>;

  return (
    <>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <small>
            Opublikowano: {new Date(post.created_at).toLocaleDateString()}
          </small>
          {post.image_url && <img src={post.image_url} alt={post.title} />}
          <p>{post.content}</p>
          <hr />
        </article>
      ))}
    </>
  );
}

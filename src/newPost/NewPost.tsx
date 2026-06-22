import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase.ts";

interface PostToSend {
  title: string;
  content: string;
  image: File | null;
  username: string;
}

export default function NewPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postToSend, setPostToSend] = useState<PostToSend>({
    title: "",
    content: "",
    image: null,
    username: "anonymous user",
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = null;
      if (postToSend.image) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Musisz być zalogowany, aby dodać zdjęcie.");
        const fileExt = postToSend.image.name.split(".").pop();
        const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const fileName = `${user.id}/${randomName}`;
        const { error: storageError } = await supabase.storage
          .from("images")
          .upload(fileName, postToSend.image);

        if (storageError) throw storageError;
        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        finalImageUrl = urlData.publicUrl;
      }
      const { error: insertError } = await supabase.from("posts").insert([
        {
          title: postToSend.title,
          content: postToSend.content,
          image_url: finalImageUrl,
          username: postToSend.username,
        },
      ]);

      if (insertError) throw insertError;

      alert("Artykuł został pomyślnie opublikowany!");
      navigate("/");
    } catch (error: any) {
      console.error("Coś poszło nie tak:", error.message);
      alert(`Błąd: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainPage">
      <h1>Nowy post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={postToSend.title}
          onChange={(e) =>
            setPostToSend({ ...postToSend, title: e.target.value })
          }
          placeholder="Tytuł"
          required
          disabled={loading}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setPostToSend({ ...postToSend, image: e.target.files[0] });
            }
          }}
          disabled={loading}
        />
        <textarea
          value={postToSend.content}
          onChange={(e) =>
            setPostToSend({ ...postToSend, content: e.target.value })
          }
          placeholder="Treść artykułu..."
          required
          disabled={loading}
        />
        <input
          type="text"
          value={postToSend.username}
          onChange={(e) =>
            setPostToSend({ ...postToSend, username: e.target.value })
          }
          placeholder="Nazwa użytkownika"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Publikowanie..." : "Opublikuj"}
        </button>
      </form>
    </div>
  );
}

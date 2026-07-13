import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase.ts";

interface PostToSend {
  title: string;
  content: string;
  image: File | null;
  is_posted_anonymously: boolean;
}

const NewPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [postToSend, setPostToSend] = useState<PostToSend>({
    title: "",
    content: "",
    image: null,
    is_posted_anonymously: false,
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Musisz być zalogowany, aby dodać post.");
      }

      let finalImageUrl = null;

      if (postToSend.image) {
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
          owner: user.id,
          is_posted_anonymously: postToSend.is_posted_anonymously,
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
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="anonymous"
            checked={postToSend.is_posted_anonymously}
            onChange={(e) =>
              setPostToSend({
                ...postToSend,
                is_posted_anonymously: e.target.checked,
              })
            }
            disabled={loading}
          />
          <label htmlFor="anonymous">Opublikuj ten post anonimowo</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Publikowanie..." : "Opublikuj"}
        </button>
      </form>
    </div>
  );
};
export default NewPost;

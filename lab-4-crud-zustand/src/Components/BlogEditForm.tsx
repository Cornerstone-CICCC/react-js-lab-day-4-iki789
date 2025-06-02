import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { usePostStore } from "../store/post.store";

const BlogEditForm = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    published: true,
  });
  const navigate = useNavigate();
  const store = usePostStore();
  const { id } = useParams();
  const post = store.posts.find((p) => p.id === id);
  const formType = id ? "Edit" : "Create";

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        content: post.content,
        published: post.published,
      });
    }
  }, [post]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const updatedPost = {
      id: id || "",
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      published: !!formData.get("published") as boolean,
    };
    if (!id) {
      updatedPost.id = crypto.randomUUID();
      store.addPost(updatedPost);
    } else {
      store.updatePost(updatedPost.id, updatedPost);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>{formType} Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border p-2 w-full mb-2"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            className="border p-2 w-full mb-2"
            value={form.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="date">Published:</label>
          <input
            type="checkbox"
            id="published"
            name="published"
            className="ml-2"
            checked={form.published}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                published: e.target.checked,
              }))
            }
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit">{formType} Post</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditForm;

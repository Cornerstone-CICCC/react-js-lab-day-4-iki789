import BlogItem from "../Components/BlogItem";
import { usePostStore } from "../store/post.store";
import { useNavigate } from "react-router";

const BlogList = () => {
  const navigate = useNavigate();
  const store = usePostStore();

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
        <button onClick={() => navigate("/upsert")}>Create New Post</button>
      </div>
      {store.posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {store.posts.map((post) => (
            <BlogItem
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              published={post.published}
              onTitleClick={(id) => {
                navigate(`/blog/${id}`);
              }}
              onEdit={(id) => {
                navigate(`/upsert/${id}`, {
                  state: { post: store.posts.find((p) => p.id === id) },
                });
              }}
              onDelete={(id) => {
                if (
                  window.confirm("Are you sure you want to delete this post?")
                ) {
                  store.deletePost(id);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className="">
          <h1 className="text-2xl font-semibold mb-4">
            No Blog Posts Available
          </h1>
          <p className="mb-4">
            It seems like there are no blog posts yet. You can create one by
            clicking the button below.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/upsert")}
          >
            Create New Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;

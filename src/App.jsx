import { useState } from "react";

function App() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const isOverLimit = content.length > 100;
  const isEmpty = content.trim().length === 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (isEmpty || isOverLimit) return;

    setPosts((currentPosts) => [content.trim(), ...currentPosts]);
    setContent("");
  }

  return (
    <main>
      <h1>Post Box</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="post-content">Post content</label>
        <br />
        <textarea
          id="post-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={5}
          cols={40}
          aria-describedby="character-count limit-message"
          aria-invalid={isOverLimit}
        />
        <br />
        <span id="character-count" aria-live="polite">
          {content.length} / 100
        </span>
        {isOverLimit && <p id="limit-message" role="alert">Limit exceeded</p>}
        <button type="submit" disabled={isEmpty || isOverLimit}>Post</button>
      </form>

      {posts.length > 0 && (
        <section>
          <h2>Posts</h2>
          <ul>
            {posts.map((post, index) => <li key={`${index}-${post}`}>{post}</li>)}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;
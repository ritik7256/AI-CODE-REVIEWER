import "./App.css";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const reviewCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error while fetching review:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ display: "flex", height: "100vh" }}>
      <div
        className="left"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="code" style={{ flex: 1 }}>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              hljs.highlight(code, { language: "javascript" }).value
            }
            padding={16}
            style={{
              fontSize: 16,
              fontFamily: "Fira Code, Fira Mono, monospace",
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
              width: "100%",
              height: "100%",
              overflow: "auto",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
        <div
          onClick={reviewCode}
          className="review"
          style={{
            padding: "1rem",
            textAlign: "center",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "⏳ Reviewing..." : "Review"}
        </div>
      </div>

      <div
        className="right"
        style={{ flex: 1, padding: "1rem", overflowY: "auto" }}
      >
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;

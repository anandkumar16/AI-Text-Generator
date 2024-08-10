import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Markdown from 'react-markdown';

const makeRequestAPI = async (prompt) => {
  const res = await axios.post("http://localhost:8080/generate", { prompt });
  console.log(res.data);
  return res.data;
};

const App = () => {
  const [prompt, setPrompt] = useState("");
  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="avatar">
          <img src="/image.png" alt="Assistant Avatar" className="avatar-img" />
        </div>
        <div className="app-description">Dost AI</div>
      </div>
      <div className="card">
        <div className="chat-bubble">
          <div className="chat-avatar">
            <img src="/image.png" alt="Assistant Avatar" className="chat-avatar-img" />
          </div>
          <div className="chat-message">
            Hello, and welcome to Dost AI ! How can we help?
          </div>
        </div>
        
        <form className="input-container" onSubmit={submitHandler}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type here ..."
          />
          <button type="submit">Send</button>
        </form>
        
        <section className="App-response">
          {mutation.isPending && <p>Loading...</p>}
          {mutation.isError && <p className="error">{mutation.error.message}</p>}
          {mutation.isSuccess && (
            <div className="chat-bubble">
              <div className="chat-avatar">
                <img src="/image.png" alt="Assistant Avatar" className="chat-avatar-img" />
              </div>
              <div className="chat-message">
                <Markdown className="markdown-content">{mutation.data}</Markdown>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;

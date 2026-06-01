import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { createSocket, sendMessage } from "@/services/socket";

export const Route = createFileRoute("/app/")({
  component: HomePage,
});

function HomePage() {

  // =========================
  // 🧠 STATE
  // =========================
  const [topic, setTopic] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const [activeStage, setActiveStage] = useState("");

  // =========================
  // 🚀 INIT SOCKET ON LOAD
  // =========================
  useEffect(() => {
    createSocket();
  }, []);

  // =========================
  // 🔐 MOCK LOGIN (replace with real login later)
  // =========================
  const handleLogin = () => {
    const fakeToken = "demo-token"; // replace with real JWT from backend
    setToken(fakeToken);
  };

  // =========================
  // 🚀 RUN AGENTS (SAFE SEND)
  // =========================
  const runAgents = () => {
    if (!topic.trim()) {
      alert("Enter topic");
      return;
    }

    if (!token) {
      alert("Please login first");
      return;
    }

    // ✅ SAFE SOCKET SEND (RENDER READY)
    sendMessage({
      topic,
      token,
    });
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="p-6 space-y-4">

      {/* =========================
          LOGIN SECTION
      ========================= */}
      {!token && (
        <div>
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login (Demo)
          </button>
        </div>
      )}

      {/* =========================
          MAIN APP
      ========================= */}
      {token && (
        <>
          <div className="text-green-600 text-sm">
            Logged in ✔
          </div>

          {/* INPUT */}
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic..."
            className="border p-2 w-full"
          />

          {/* RUN BUTTON */}
          <button
            onClick={runAgents}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Run AI Agents
          </button>

          {/* STATUS */}
          <div className="mt-4 text-sm text-gray-500">
            Active Stage: {activeStage || "idle"}
          </div>
        </>
      )}
    </div>
  );
}
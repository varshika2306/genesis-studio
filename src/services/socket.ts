const WS_URL = "wss://ai-studio-backend-tzeu.onrender.com/ws/orchestrate";

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let manualClose = false;

// =========================
// CREATE CONNECTION
// =========================
export const createSocket = () => {
  manualClose = false;

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onclose = () => {
    console.log("⚠️ WebSocket disconnected");

    if (!manualClose) {
      reconnectTimer = setTimeout(() => {
        console.log("🔄 Reconnecting WebSocket...");
        createSocket();
      }, 2000);
    }
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error:", err);
  };

  return socket;
};

// =========================
// GET SOCKET INSTANCE
// =========================
export const getSocket = () => socket;

// =========================
// SEND MESSAGE SAFELY
// =========================
export const sendMessage = (data: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn("⚠️ WebSocket not ready");
  }
};

// =========================
// CLOSE CONNECTION
// =========================
export const closeSocket = () => {
  manualClose = true;

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }

  socket?.close();
  socket = null;
};
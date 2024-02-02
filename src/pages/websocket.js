// websocket.js

const initWebSocket = () => {
    const websocket = new WebSocket("ws://localhost:8000/ws/glooing/timer");
  
    websocket.onmessage = ({ data }) => {
      const message = document.createElement("li");
      const content = document.createTextNode(data);
      message.appendChild(content);
      document.body.appendChild(message);
    };
  
    return websocket;
  };
  
  export default initWebSocket;
  
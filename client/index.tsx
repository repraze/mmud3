import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

function spawn(root: Element) {
    ReactDOM.render(<App />, root);
}

declare global {
    interface Window {
        spawn: (root: Element) => void;
    }
}
if (window) {
    window.spawn = spawn;
}

// const connection = new SocketConnection<ClientInEvents, ClientOutEvents>(new WebSocket("ws://localhost:8081"));

// connection.on("open", () => {
//     connection.send("text", "Hello World!");
// });

// connection.on("close", () => {
//     console.log("disconnection");
// });

// connection.on("text", (text) => {
//     console.log("received", text);
// });

import "source-map-support/register";
import path from "path";
import express from "express";

const PORT = 8080;
const server = express();

server.use("/public", express.static(path.resolve(__dirname, "public")));
server.get("/*", async (req, res) => {
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
});

server.listen(PORT, () => console.log("running"));

export default server;

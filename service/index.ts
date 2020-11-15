import "source-map-support/register";
import {ServerInEvents, ServerOutEvents} from "../engine/application-events";
import SocketService from "../engine/communication/socket-service";

async function start() {
    const service = new SocketService<ServerInEvents, ServerOutEvents>();

    service.on("connection", (connection) => {
        console.log("new connection");

        connection.on("text", (text) => {
            console.log("received", text);
            connection.send("text", text);
        });

        connection.on("close", () => {
            console.log("connection closed");
        });
    });

    await service.start();
    console.log("service running");
}

start();

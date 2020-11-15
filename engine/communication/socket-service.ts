import http from "http";
import {Server} from "ws";
import Service from "./service";
import {ConnectionInEvents, ConnectionEvents} from "./connection";
import SocketConnection from "./socket-connection";

const PORT = 8081;

export default class SocketService<
    InEvents extends ConnectionInEvents,
    OutEvents extends ConnectionEvents = InEvents
> extends Service<InEvents, OutEvents> {
    private server?: http.Server;

    constructor() {
        super("socket-service");
    }
    start(): Promise<void> {
        this.server = new http.Server();
        const socketService = new Server({server: this.server});

        socketService.on("connection", (socket, req) => {
            const connection = new SocketConnection<InEvents, OutEvents>((socket as unknown) as WebSocket);

            connection.on("close", () => {
                this.emit("disconnection", connection);
            });

            this.emit("connection", connection);
        });

        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.listen(PORT, () => {
                    this.emit("start");
                    resolve();
                });
            }
        });
    }
    stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    this.emit("stop");
                    resolve();
                });
            }
        });
    }
}

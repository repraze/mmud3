import Connection, {ConnectionEvents, ConnectionInEvents} from "../engine/communication/connection";
import SocketConnection from "../engine/communication/socket-connection";
import random from "../engine/utils/random";

export interface ServerInfo {
    id: string;
    name: string;
    url: string;
}

export default class SocketClient<InEvents extends ConnectionInEvents, OutEvents extends ConnectionEvents = InEvents> {
    private connections: Map<string, Connection<InEvents, OutEvents>>;

    constructor() {
        this.connections = new Map();
    }
    async connect(info: ServerInfo): Promise<Connection<InEvents, OutEvents>> {
        const id = random.idBase64();
        const socket = new WebSocket(info.url);
        const connection = new SocketConnection<InEvents, OutEvents>(socket);

        connection.on("close", () => {
            console.log("disconnection");
        });

        return new Promise((resolve, reject) => {
            connection.once("open", () => {
                this.connections.set(id, connection);
                resolve(connection);
            });
        });
    }
    has(id: string): boolean {
        return this.connections.has(id);
    }
    get(id: string): Connection<InEvents, OutEvents> | undefined {
        return this.connections.get(id);
    }
}

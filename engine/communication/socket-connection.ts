import Connection, {ConnectionInEvents, ConnectionEvents} from "./connection";

export default class SocketConnection<
    InEvents extends ConnectionInEvents,
    OutEvents extends ConnectionEvents = InEvents
> extends Connection<InEvents, OutEvents> {
    private socket: WebSocket;

    constructor(socket: WebSocket, id?: string) {
        super("socket", id);
        this.socket = socket;

        socket.onopen = () => {
            this.emit("open");
        };
        socket.onclose = () => {
            this.emit("close");
        };
        socket.onerror = (event) => {
            this.socket.close();
        };
        socket.onmessage = (event) => {
            if (typeof event.data === "string") {
                try {
                    const data = JSON.parse(event.data);
                    if (data && data.name && typeof data.name === "string" && data.value && Array.isArray(data.value)) {
                        this.emit(data.name, ...data.value);
                    }
                } catch (error) {
                    console.error("Invalid JSON message received", event.data);
                }
            } else {
                console.error("Invalid data message received", event.data);
            }
        };
    }
    send<Name extends keyof OutEvents>(name: Name, ...value: OutEvents[Name]) {
        const message = JSON.stringify({name, value});
        this.socket.send(message);
    }
    close() {
        this.socket.close();
        this.emit("close");
    }
}

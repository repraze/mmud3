import EventEmitter from "../utils/event-emitter";
import Connection, {ConnectionInEvents, ConnectionEvents} from "./connection";

interface ServiceEvents<InEvents extends ConnectionInEvents, OutEvents extends ConnectionEvents> {
    start: [];
    stop: [];
    connection: [connection: Connection<InEvents, OutEvents>];
    disconnection: [connection: Connection<InEvents, OutEvents>];
}

export default abstract class Service<
    InEvents extends ConnectionInEvents,
    OutEvents extends ConnectionEvents = InEvents
> extends EventEmitter<ServiceEvents<InEvents, OutEvents>> {
    public type: string;

    constructor(type: string) {
        super();
        this.type = type;
    }
    abstract start();
    abstract stop();
}

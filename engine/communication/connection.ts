import EventEmitter, {EventEmitterEvents} from "../utils/event-emitter";
import random from "../utils/random";

export type ConnectionEvents = EventEmitterEvents;

export interface ConnectionInEvents extends ConnectionEvents {
    open: [];
    close: [];
}

export default abstract class Connection<
    InEvents extends ConnectionInEvents,
    OutEvents extends ConnectionEvents = InEvents
> extends EventEmitter<InEvents> {
    public type: string;
    public id: string;

    constructor(type: string, id?: string) {
        super();
        this.type = type;
        this.id = id === undefined ? random.idBase64() : id;
    }
    abstract send<Name extends keyof OutEvents>(name: Name, ...value: OutEvents[Name]);
    abstract close();
}

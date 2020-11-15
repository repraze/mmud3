export interface ClientOutEvents {
    text: [text: string];
}

export interface ServerOutEvents {
    text: [text: string];
    input: [text: string];
}

export interface ClientInEvents extends ServerOutEvents {
    open: [];
    close: [];
}

export interface ServerInEvents extends ClientOutEvents {
    open: [];
    close: [];
}

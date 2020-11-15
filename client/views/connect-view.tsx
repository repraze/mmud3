/** @jsx jsx */
import React, {useCallback, useState} from "react";
import {css, jsx} from "@emotion/core";
import {NavLink, useHistory} from "react-router-dom";
import {ClientInEvents, ClientOutEvents} from "../../engine/application-events";
import SocketClient from "../socket-client";

const connectViewStyle = css({
    position: "relative",
    flex: 1,
    flexDirection: "column",
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
});

const connectViewListStyle = css({
    flex: 1,
    overflowX: "hidden",
    overflowY: "auto",
});

const connectViewInputStyle = css({
    flex: 0,
});

export interface ConnectViewProps {
    socketClient: SocketClient<ClientInEvents, ClientOutEvents>;
}

export default function ConnectView({socketClient}: ConnectViewProps) {
    const history = useHistory();

    const [name, setName] = useState("test");
    const [url, setUrl] = useState("ws://localhost:8081");

    const handleConnect = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (name.trim() !== "" && url.trim() !== "") {
                try {
                    const connection = await socketClient.connect(name, url);
                    console.log(connection);
                } catch (error) {
                    console.error(error);
                }
            }
        },
        [socketClient, name, url]
    );

    return (
        <div css={connectViewStyle}>
            <div css={connectViewListStyle}>
                <ul>
                    {socketClient.list().map((info) => {
                        <li>
                            <NavLink to={info.id}>{info.name}</NavLink>
                        </li>;
                    })}
                </ul>
            </div>
            <div css={connectViewInputStyle}>
                <form onSubmit={handleConnect}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Url"
                        value={url}
                        onChange={(event) => {
                            setUrl(event.target.value);
                        }}
                    />
                    <button type="submit">Connect</button>
                </form>
            </div>
        </div>
    );
}

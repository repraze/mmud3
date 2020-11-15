/** @jsx jsx */
import React, {useCallback, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Global, css, jsx} from "@emotion/core";
import Container from "./layout/container";
import Theming from "./theming";
import LandingView from "./views/landing-view";
import ConnectView from "./views/connect-view";
import ErrorView from "./views/error-view";
import SocketClient, {ServerInfo} from "./socket-client";
import {ClientInEvents, ClientOutEvents} from "../engine/application-events";
import Drawer from "./layout/drawer";
import StyleReset from "./style-reset";
import IconToolView from "./views/icon-tool-view";

const appGlobalStyle = css({
    html: {
        height: "100%",
    },
    body: {
        display: "block",
        position: "relative",
        margin: 0,
        padding: 0,
        height: "100%",
    },
});

const appStyle = css({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
});

export default function App() {
    const [serverList, setServerList] = useState<ServerInfo[]>([]);
    const socketClient = new SocketClient<ClientInEvents, ClientOutEvents>();

    const handlerServerAdd = useCallback(
        (server: ServerInfo) => {
            setServerList([...serverList, server]);
        },
        [serverList]
    );
    const handleServerRemove = useCallback((server: ServerInfo) => {}, [serverList]);

    return (
        <div css={appStyle}>
            <StyleReset>
                <Global styles={appGlobalStyle} />
                <Theming>
                    <Container>
                        <Drawer menu={<div>test</div>}>
                            <Router>
                                <Switch>
                                    <Route path="/" exact component={() => <LandingView />} />
                                    <Route path="/icon" exact component={() => <IconToolView />} />
                                    <Route component={() => <ErrorView />} />
                                </Switch>
                            </Router>
                        </Drawer>
                    </Container>
                </Theming>
            </StyleReset>
        </div>
    );
}

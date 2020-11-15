import React, {useContext} from "react";
import {DrawerContext} from "../layout/drawer";
import Navigation from "../layout/navigation";

export default function LandingView({}) {
    const drawer = useContext(DrawerContext);
    return (
        <>
            <Navigation title="Welcome" />
            <div>
                <h1>Welcome</h1>
                <button onClick={drawer.open}>Connect Now</button>
            </div>
        </>
    );
}

/** @jsx jsx */
import React, {useContext} from "react";
import {css, jsx} from "@emotion/core";
import {Theme} from "../theming";
import {DrawerContext} from "./drawer";
import Button from "../components/button";
import Icon from "../components/icon";
import {iconMenu} from "../utils/icons";

const navigationStyle = (theme: Theme) =>
    css({
        position: "relative",
        alignItems: "stretch",
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
        fontSize: "1em",
        fontWeight: 400,
        lineHeight: 1.5,

        ".item": {
            padding: ".25rem .5rem",
        },

        ".title": {
            flexGrow: 1,
        },
    });

export interface NavigationProps {
    title: string;
}

export default function Navigation({title}: NavigationProps) {
    const drawer = useContext(DrawerContext);
    return (
        <nav css={navigationStyle}>
            <Button className="item menu" onClick={drawer.open}>
                <Icon icon={iconMenu} />
            </Button>
            <div className="item title">{title}</div>
        </nav>
    );
}

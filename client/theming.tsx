/** @jsx jsx */
import React from "react";
import {jsx} from "@emotion/core";
import {ThemeProvider} from "emotion-theming";
import {Palette, PICO_8_PALETTE} from "./palette";

export enum ThemeColors {
    Primary = "primary",
    White = "white",
    Black = "black",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
    Info = "info",
    Transparent = "transparent",
}

export interface Theme {
    palette: Palette;
    colors: {
        [key in ThemeColors]: string;
    };
    animation: {
        speed: string;
        speedSlow: string;
    };
    background: string;
    fontFamily: string;
    fontColor: string;
}

// TODO: finish palette derive from PICO
// TODO: use polished for maths

export function themeFromPalette(palette: Palette, mode: "light" | "dark" = "dark"): Theme {
    return {
        palette: palette,
        colors: {
            primary: palette.blue,
            white: palette.white,
            black: palette.black,
            success: palette.green,
            warning: palette.yellow,
            danger: palette.red,
            info: palette.blue,
            transparent: `rgba(${palette.white}, 0)`,
        },
        animation: {
            speed: "86ms",
            speedSlow: "172ms",
        },
        background: mode === "light" ? palette.white : palette.black,
        fontFamily: "'Source Code Pro', monospace",
        fontColor: mode === "light" ? palette.black : palette.white,
    };
}

export const DEFAULT_THEME = themeFromPalette(PICO_8_PALETTE);

export interface ThemingProps {
    children: React.ReactNode;
}

export default function Theming({children}: ThemingProps) {
    return <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>;
}

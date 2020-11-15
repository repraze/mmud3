/** @jsx jsx */
import React, {useEffect, useRef} from "react";
import classnames from "classnames";
import {css, jsx} from "@emotion/core";
import {useTheme} from "emotion-theming";
import {drawIcon, IconString, paletteToIconPalette} from "../utils/icon";
import {Theme} from "../theming";

const iconStyle = (theme: Theme) => css``;

export interface IconProps {
    className?: string;
    icon: IconString;
}

export default function Icon({className, icon}: IconProps) {
    const theme = useTheme<Theme>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
            canvas.width = 16;
            canvas.height = 16;
            canvas.style.width = "16px";
            canvas.style.height = "16px";
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.save();
                // pull color as mask color
                ctx.fillStyle = window.getComputedStyle(canvas, null).getPropertyValue("color");
                console.log(ctx.fillStyle);
                ctx.scale(2, 2);
                drawIcon(ctx, icon, paletteToIconPalette(theme.palette), 0, 0);
                ctx.restore();
            }
        }
    }, [icon]);

    return (
        <span css={iconStyle} className={classnames("icon", className)}>
            <canvas width="1" height="1" ref={canvasRef} />
        </span>
    );
}

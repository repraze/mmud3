/** @jsx jsx */
import React from "react";
import classnames from "classnames";
import {css, jsx} from "@emotion/core";
import {Theme} from "../theming";

const containerStyle = (theme: Theme) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.background};
    width: 100vw;
    height: 100%;
`;

const containerBodyStyle = (theme: Theme) => css`
    position: relative;
    display: flex;
    color: ${theme.fontColor};
    font-family: ${theme.fontFamily};
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 800px;
    margin: auto;
    background: ${theme.background};
    overflow: hidden;
`;

export interface ContainerProps {
    className?: string;
    children: React.ReactNode;
}

export default function Container({className, children, ...props}: ContainerProps) {
    return (
        <div className={classnames("container", className)} css={containerStyle} {...props}>
            <div css={(theme) => containerBodyStyle(theme)}>{children}</div>
        </div>
    );
}

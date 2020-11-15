/** @jsx jsx */
import React from "react";
import classnames from "classnames";
import {css, jsx} from "@emotion/core";
import {Theme} from "../theming";

const buttonStyle = (theme: Theme) => {
    const COLOR = theme.fontColor;
    const BACKGROUND_COLOR = theme.background;
    const BORDER_COLOR = "#dbdbdb";
    const PADDING_HORIZONTAL = "1em";
    const PADDING_VERTICAL = "calc(0.5em - 1px)";
    return css`
        position: relative;
        display: inline-flex;
        border: 1px solid ${BORDER_COLOR};
        color: ${COLOR};
        background-color: ${BACKGROUND_COLOR};
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        padding-left: ${PADDING_HORIZONTAL};
        padding-right: ${PADDING_HORIZONTAL};
        padding-top: ${PADDING_VERTICAL};
        padding-bottom: ${PADDING_VERTICAL};
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        height: 2.5em;
        line-height: 1.5;
        max-width: 100%;
        vertical-align: top;

        // states
        &:hover,
        &.hover,
        &:focus,
        &.focus {
            background-color: darken(${BACKGROUND_COLOR}, 3%);
        }

        &:active,
        &.active {
            background-color: darken(${BACKGROUND_COLOR}, 7%);
        }

        &:disabled {
            opacity: 50%;
            cursor: default;
            pointer-events: none;
        }

        &.loading {
            color: transparent !important;
            pointer-events: none;
        }

        .icon {
            height: 1.5em;
            width: 1.5em;
            &:first-of-type:last-of-type {
                margin-left: calc(-${PADDING_HORIZONTAL / 2} - 1px);
                margin-right: calc(-${PADDING_HORIZONTAL / 2} - 1px);
            }
        }

        // sizings
        &.small {
            font-size: 0.75rem;
        }
        &.normal {
            font-size: 1rem;
        }
        &.medium {
            font-size: 1.25rem;
        }
        &.large {
            font-size: 1.5rem;
        }

        // colors
    `;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    color: string;
}

export default function Button({className, children, color, ...props}: ButtonProps) {
    return (
        <button className={classnames("button", className)} css={buttonStyle} {...props}>
            {children}
        </button>
    );
}

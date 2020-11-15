/** @jsx jsx */
import React from "react";
import {Global, css, jsx} from "@emotion/core";

const styleResetStyle = css`
    // Blocks
    html,
    body,
    p,
    ol,
    ul,
    li,
    dl,
    dt,
    dd,
    blockquote,
    figure,
    fieldset,
    legend,
    textarea,
    pre,
    iframe,
    hr,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
        padding: 0;
    }

    // Headings
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: normal;
    }

    // List
    ul {
        list-style: none;
    }

    // Form
    button,
    input,
    select,
    textarea {
        margin: 0;
    }

    // Box sizing
    html {
        box-sizing: border-box;
    }

    * &,
    &:before,
    &:after {
        box-sizing: inherit;
    }

    // Media
    img,
    video {
        height: auto;
        max-width: 100%;
    }

    // Iframe
    iframe {
        border: 0;
    }

    // Table
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    td,
    th {
        padding: 0;
        text-align: left;
    }
`;

export interface StyleResetProps {
    children: React.ReactNode;
}

export default function StyleReset({children}: StyleResetProps) {
    return (
        <React.Fragment>
            <Global styles={styleResetStyle} />
            {children}
        </React.Fragment>
    );
}

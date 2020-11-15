/** @jsx jsx */
import React, {useCallback, useState} from "react";
import classnames from "classnames";
import {css, jsx} from "@emotion/core";
import {delay} from "../../engine/utils/timing";
import {Theme} from "../theming";

const DRAWER_WIDTH = 320;
const DRAWER_HIDE_PAD = 10;

const drawerStyle = (theme: Theme) => css`
    z-index: 10;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;

    &.open {
        .drawer-backdrop {
            background-color: rgba(0, 0, 0, 0.4);
        }
        .drawer {
            transform: translateX(${DRAWER_WIDTH + DRAWER_HIDE_PAD}px);
        }
    }

    &.hidden {
        .drawer-backdrop {
            width: 0;
            height: 0;
        }
    }

    .drawer-content {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .drawer-backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        transition-duration: ${theme.animation.speedSlow};
        transition-property: background-color;
        transition-timing-function: ease-in-out;
    }

    .drawer {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: ${-DRAWER_WIDTH - DRAWER_HIDE_PAD}px;
        height: 100%;
        width: ${DRAWER_WIDTH}px;
        background-color: ${theme.background};
        box-shadow: $shadow;
        transform: translateX(0);
        transition-duration: ${theme.animation.speedSlow};
        transition-property: transform;
        transition-timing-function: ease-in-out;
    }
`;

export interface DrawerContextValue {
    open: () => void;
    close: () => Promise<void>;
    toggle: () => void;
}

export const DrawerContext = React.createContext<DrawerContextValue>({
    open: () => {},
    close: async () => {},
    toggle: () => {},
});

export interface DrawerProps {
    className?: string;
    children: React.ReactNode;
    menu: React.ReactNode;
}

export default function Drawer({className, children, menu, ...props}: DrawerProps) {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(true);

    const handleOpen = useCallback(() => {
        setOpen(true);
        setHidden(false);
    }, [open, hidden]);
    const handleClose = useCallback(async () => {
        setOpen(false);
        setHidden(false);
        await delay(200);
        setOpen(false);
        setHidden(true);
    }, [open, hidden]);
    const handleToggle = useCallback(() => {
        if (open) {
            handleClose();
        } else {
            handleOpen();
        }
    }, [open, handleClose, handleOpen]);

    const context: DrawerContextValue = {open: handleOpen, close: handleClose, toggle: handleToggle};

    return (
        <div
            className={classnames(
                "drawer",
                {
                    open: open,
                    hidden: hidden,
                },
                className
            )}
            css={drawerStyle}
            {...props}
        >
            <DrawerContext.Provider value={context}>
                <div className="drawer-content">{children}</div>
                <div className="drawer-backdrop" onClick={handleClose} />
                <div className="drawer">{menu}</div>
            </DrawerContext.Provider>
        </div>
    );
}

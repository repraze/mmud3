import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "emotion-theming";
import {Theme} from "../theming";
import Navigation from "../layout/navigation";
import {decodeIcon, drawIcon, encodeIcon, paletteToIconPalette} from "../utils/icon";
import {iconEmpty, iconMenu} from "../utils/icons";

function IconEditorPalette({color, setColor, palette}) {
    return (
        <div>
            {palette.map((c, i) => {
                return (
                    <span
                        key={i}
                        style={{
                            display: "inline-block",
                            width: "25px",
                            height: "25px",
                            backgroundColor: c,
                            border: color === i ? "2px solid white" : "none",
                        }}
                        onClick={() => setColor(i)}
                    />
                );
            })}
        </div>
    );
}

function IconEditorCanvas({color, text, setText, palette}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
            function addColor(event: MouseEvent) {
                const x = Math.floor(event.offsetX / 32);
                const y = Math.floor(event.offsetY / 32);
                const data = decodeIcon(text);
                if (data) {
                    data.data[y * 8 + x] = color;
                    setText(encodeIcon(data));
                }
            }
            canvas.addEventListener("mousedown", addColor, {passive: false, capture: false});
            canvas.width = 256;
            canvas.height = 256;
            canvas.style.width = "256px";
            canvas.style.height = "256px";
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.save();
                ctx.scale(32, 32);
                drawIcon(ctx, text, palette, 0, 0);
                ctx.restore();
            }
            return () => {
                canvas.removeEventListener("mousedown", addColor);
            };
        }
    }, [color, text, setText, palette]);
    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
}

function IconEditor() {
    const {palette} = useTheme<Theme>();
    const iconPalette = paletteToIconPalette(palette);

    const [color, setColor] = useState(0);
    const [text, setText] = useState(iconMenu);

    return (
        <div>
            <IconEditorPalette color={color} setColor={setColor} palette={iconPalette} />
            <IconEditorCanvas color={color} text={text} setText={setText} palette={iconPalette} />
            <input type="text" value={text} readOnly />
        </div>
    );
}

export default function IconToolView({}) {
    return (
        <>
            <Navigation title="Icon Creator" />
            <div>
                <IconEditor />
            </div>
        </>
    );
}

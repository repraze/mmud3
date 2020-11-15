import {Palette} from "../palette";

export type IconString = string;
export type IconData = {
    none: number;
    mask: number;
    data: number[];
};
export type IconPalette = string[];

const ICON_PIXELS_LENGTH = 8 * 8;
const ICON_HEADER_LENGTH = 2;
const ICON_DATA_LENGTH = ICON_HEADER_LENGTH + ICON_PIXELS_LENGTH;
const ICON_DATA_STRING_LENGTH = ICON_DATA_LENGTH;

// Each pixel is a value 0 to 15 (hex) 4bits

const PALETTE_TO_ICON_PALETTE: (keyof Palette)[] = [
    "black",
    "darkBlue",
    "darkPurple",
    "darkGreen",
    "brown",
    "darkGrey",
    "lightGrey",
    "white",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "lavender",
    "pink",
    "lightPeach",
];
export function paletteToIconPalette(palette: Palette): IconPalette {
    return PALETTE_TO_ICON_PALETTE.map((n) => palette[n]);
}

export function decodeIcon(str: IconString): IconData | undefined {
    if (str.length === ICON_DATA_STRING_LENGTH) {
        const d = str.split("").map((c) => parseInt(c, 16));
        const none = d[0];
        const mask = d[1];
        const data = d.slice(2);
        return {
            none,
            mask,
            data,
        };
    } else {
        console.warn(`Trying to draw invalid icon data: "${str}"`);
        return undefined;
    }
}

export function encodeIcon(data: IconData): IconString {
    return [data.none, data.mask, ...data.data].map((n) => n.toString(16)).join("");
}

export function drawIcon(ctx: CanvasRenderingContext2D, str: IconString, palette: IconPalette, x: number, y: number) {
    const icon = decodeIcon(str);
    if (icon) {
        for (let p = 0; p < ICON_PIXELS_LENGTH; p++) {
            const pixelColor = icon.data[p];
            if (pixelColor !== icon.none) {
                const px = p % 8;
                const py = Math.floor(p / 8);
                ctx.fillStyle = palette[pixelColor];
                ctx.fillRect(x + px, y + py, 1, 1);
            }
        }
    }
}

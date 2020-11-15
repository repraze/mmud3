export function delay(t: number) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, t);
    });
}

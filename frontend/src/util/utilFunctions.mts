export const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    waitFor: number
) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            callback(...args);
        }, waitFor);
    };
};
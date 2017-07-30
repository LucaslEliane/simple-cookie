interface MockWindow extends Window {
    encodeURIComponent: (decodeURIComponent: string) => string;
    decodeURIComponent: (encodeURIComponent: string) => string;
}
